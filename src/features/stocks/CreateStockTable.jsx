import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";
import { useCreateStock } from "./hooks/useCreateStock";
import { useEditStock } from "./hooks/useEditStock";

function CreateCabinForm({ stockToEdit = {}, onClose }) {
  const { id: EditId, ...EditValues } = stockToEdit;
  const hasEditing = Boolean(EditId);

  const { isCreating, addStock } = useCreateStock();
  const { isEditing, editStock } = useEditStock();

  const isWorking = isEditing || isCreating;
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: hasEditing ? EditValues : {},
  });
  const { errors } = formState;

  function onSubmit(data) {
    console.log(data)
    const image = typeof data.image === "string" ? data.image : data.image[0];
    hasEditing
      ? editStock(
          { newStock: { ...data, image }, id: EditId },
          {
            onSuccess: () => {
              reset();
              onClose?.();
            },
          }
        )
      : addStock(
          { ...data, image: data.image[0] },
          {
            onSuccess: () => {
              reset();
              onClose?.();
            },
          }
        );
  }

  function onError(errors) {
    toast.error("Plz Provide meaningfull Inputs");
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} type={onClose ? 'modal' : 'regular'}>
      <FormRow label="Stock name" error={errors?.stockName?.message}>
        <Input
          disabled={isWorking}
          type="text"
          id="stockName"
          {...register("stockName", {
            required: "This field is Required",
          })}
        />
      </FormRow>

      <FormRow label="Per Stock Price" error={errors?.perStockPrice?.message}>
        <Input
          disabled={isWorking}
          type="number"
          id="perStockPrice"
          {...register("perStockPrice", {
            required: "This field is Required",
            min: {
              value: 1,
              message: "PerStock Price Should be greater than 0",
            },
          })}
        />
      </FormRow>

      <FormRow
        label={"Available Stocks in {%}"}
        error={errors?.availableStocks?.message}
      >
        <Input
          disabled={isWorking}
          type="number"
          id="availableStocks"
          {...register("availableStocks", {
            required: "This field is Required",
            validate: (value) =>
              value < 100 || "Available Stocks Should be less than 100%",
            min: {
              value: 1,
              message: "Available Stocks Should be greater than 0%",
            },
          })}
        />
      </FormRow>

      <FormRow label="Owner's Name" error={errors?.owner?.message}>
        <Input
          disabled={isWorking}
          type="text"
          id="owner"
          {...register("owner", {
            required: "This field is Required",
          })}
        />
      </FormRow>


      <FormRow
        label="Description for Stock"
        error={errors?.description?.message}
      >
        <Textarea
          type="text"
          id="description"
          defaultValue=""
          {...register("description", {
            required: hasEditing ? false : "This field is Required",
          })}
        />
      </FormRow>
      <FormRow label="Stocks related photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: hasEditing ? false : "This Field is Required!",
          })}
        />
      </FormRow>
      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={() => onClose?.()}>
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {hasEditing ? "Edit Stock" : "Add Stock"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
