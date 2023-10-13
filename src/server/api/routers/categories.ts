import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const categoriesRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.category.findMany();
  }),
});
