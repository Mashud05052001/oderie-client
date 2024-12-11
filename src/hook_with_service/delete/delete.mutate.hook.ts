import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteProductService } from "./delete.mutate.service";

export const useDeleteProduct = () => {
  return useMutation<any, Error, string, unknown>({
    mutationFn: async (productId: string) =>
      await deleteProductService(productId),
    onSuccess: () => {
      toast.success("Product deleted successfully");
    },
    onError: (error) => {
      toast.error(`Failed. ${error?.message}`);
    },
  });
};
