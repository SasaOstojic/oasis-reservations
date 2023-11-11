import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { createCabins } from "../../services/apiCabins";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import FormRow from "../../ui/FormRow";

function CreateCabinForm() {
  const {register, handleSubmit, reset, getValues, formState} = useForm();
  const {errors} = formState;
  const queryClient = useQueryClient();
  const {mutate, isLoading: isCreating} = useMutation({
    mutationFn: createCabins,
    onSuccess: () => {
      toast.success('New cabin succesfully created')
      queryClient.invalidateQueries({
        queryKey: ["cabins"]
      });
      reset();
    },
    onError: (err) => toast.error(err.message)
  });


  function onSubmit(data){
    mutate({...data, image: data.image[0]});
  }

  function onError(errors){
    console.log(errors);
  }

  return (
    <Form onSubmit = {handleSubmit(onSubmit, onError)}>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input type="number" id="maxCapacity" {...register("maxCapacity",{
          required: 'This field is required',
          min: {value: 1, message: 'Capacity should be at least 1'}
        })} />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input type="number" id="regularPrice" {...register("regularPrice",
         {required: 'This field is required',
         min: {value: 1, message: 'Price should be at least 1'},
         validate: (value) => value <= getValues().regularPrice || 'Regular price is missing'
         })} />
      </FormRow>

      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input type="text" id="name" {...register("name",{
          required: 'This field is required',
          validate: (value) => value <= getValues().name || 'Cabin name is missing'
        })} />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input type="number" id="discount" defaultValue={0} {...register("discount", {
          required: 'This field is required',
          validate: (value) => value <= getValues().discount || 'Discount should be less than regular price'})} />
      </FormRow>

      <FormRow label="Description" error={errors?.description?.message}>
        <Textarea type="text" id="description" defaultValue="" {...register("description",{
          required: 'This field is required',
        validate: (value) => value <= getValues().description || 'Description is missing'})} />
      </FormRow>

      <FormRow label="Image" error={errors?.image?.message}>
        <FileInput type="file" id="image" accept="image/*" {...register("image",{
        validate: (value) => value <= getValues().image || 'Image is missing'})} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Edit cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
