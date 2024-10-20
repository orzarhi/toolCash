'use server';

import { db } from '@/db';
import { CreateMilestonePayment } from '@/lib/validation';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { PAYMENT } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export const createMilestonePaymentAction = async (
  milestonePayment: CreateMilestonePayment & { expenseId: string; paymentType: PAYMENT }
) => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
      throw new Error('User not found');
    }

    const { expenseId, paymentType } = milestonePayment;

    if (!expenseId) {
      throw new Error('Expense ID not found');
    }

    const expense = await db.expense.findFirst({
      where: {
        id: expenseId,
        userId: user.id,
      },
    });

    if (!expense) {
      throw new Error('Expense not found');
    }

    await db.milestonePayment.create({
      data: {
        expenseId: expense.id,
        title: milestonePayment.title,
        paidAmount: parseFloat(milestonePayment.amount),
        paymentType,
        date: milestonePayment.date,
        description: milestonePayment.description || null,
      },
    });

    await db.expense.update({
      where: {
        id: expenseId,
        userId: user.id,
      },
      data: {
        totalMilestonePayment: {
          increment: parseFloat(milestonePayment.amount),
        },
        remaining: {
          decrement: parseFloat(milestonePayment.amount),
        },
      },
    });

    revalidatePath('/dashboard');

    return { success: true };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      error: 'משהו השתבש, נסה שוב מאוחר יותר.',
    };
  }
};

export const deleteMilestonePaymentAction = async (milestonePaymentId: string) => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
      throw new Error('User not found');
    }

    const milestonePayment = await db.milestonePayment.findFirst({
      where: {
        id: milestonePaymentId,
        expense: {
          userId: user.id,
        },
      },
    });

    if (!milestonePayment) {
      throw new Error('Milestone payment not found');
    }

    await db.expense.update({
      where: {
        id: milestonePayment.expenseId as string,
        userId: user.id,
      },
      data: {
        totalMilestonePayment: {
          decrement: milestonePayment.paidAmount,
        },
        remaining: {
          increment: milestonePayment.paidAmount,
        },
      },
    });

    await db.milestonePayment.delete({
      where: {
        id: milestonePaymentId,
      },
    });

    revalidatePath('/dashboard');

    return { success: true };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      error: 'משהו השתבש, נסה שוב מאוחר יותר.',
    };
  }
};
