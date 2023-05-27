"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormProps, useForm } from "react-hook-form";
import { z } from "zod";
/**
 *  zod + react-hook-form
 */
export const useZodForm = <TSchema extends z.ZodType>(
  props: Omit<UseFormProps<TSchema["_input"]>, "resolver"> & {
    schema: TSchema;
  }
) => {
  const form = useForm<TSchema["_input"]>({
    ...props,
    resolver: zodResolver(props.schema, undefined),
  });

  return form;
};
