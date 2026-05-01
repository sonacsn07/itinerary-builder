import { COOKIE_NAME } from "../shared/const.js";
import { getSessionCookieOptions } from "./_core/cookies.js";
import { systemRouter } from "./_core/systemRouter.js";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc.js";
import { z } from "zod";
import { generateItineraryPDF } from "./pdf-generator.js";
import { ItineraryFormData } from "../shared/types.js";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  itinerary: router({
    generatePDF: publicProcedure
      .input(z.any())
      .mutation(async ({ input }) => {
        try {
          const data = input as ItineraryFormData;
          const buffer = await generateItineraryPDF(data);
          return {
            success: true,
            html: buffer.toString("utf-8"),
          };
        } catch (error) {
          console.error("PDF generation error:", error);
          throw new Error("Failed to generate PDF");
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
