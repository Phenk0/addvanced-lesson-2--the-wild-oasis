// noinspection JSValidateTypes

import { useForm } from 'react-hook-form';

import Form from '../../ui/Form.jsx';
import Input from '../../ui/Input.jsx';
import FormRow from '../../ui/FormRow.jsx';
import Button from '../../ui/Button.jsx';
import FileInput from '../../ui/FileInput.jsx';
import Textarea from '../../ui/Textarea.jsx';

import useCreateCabin from './useCreateCabin.js';
import useEditCabin from './useEditCabin.js';

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { createCabin, isCreating } = useCreateCabin();
  const { editCabin, isEditing } = useEditCabin();
  const isWorking = isCreating || isEditing;

  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const {
    register,
    handleSubmit,
    formState,
    reset,
    getValues
    /*placeholder*/
  } = useForm({ defaultValues: isEditSession ? editValues : null });

  const { errors } = formState;

  function onSubmit(data) {
    const image = typeof data.image === 'string' ? data.image : data.image[0];

    if (isEditSession)
      editCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          }
        }
      );
    else
      createCabin(
        { ...data, image },
        {
          onSuccess: (data) => {
            console.log(data);
            reset();
            onCloseModal?.();
          }
        }
      );
  }
  function onError(errors) {
    //just in case
    console.log('CreateCabinForm.jsx: ', errors);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? 'modal' : 'regular'}
    >
      <FormRow
        label="Cabin name"
        inputName="name"
        error={errors?.name?.message}
      >
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register('name', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register('maxCapacity', {
            required: 'This field is required',
            min: { value: 1, message: 'Capacity should be at least 1' }
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register('regularPrice', {
            required: 'This field is required',
            min: { value: 1, message: 'Regular price should me at least 1' }
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isWorking}
          {...register('discount', {
            required: 'This field is required',
            //custom VALIDATION of forms
            validate: (value) =>
              value < Number(getValues().regularPrice) ||
              'Discount must be less then regular price'
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          id="description"
          defaultValue=""
          disabled={isWorking}
          {...register('description', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          disabled={isWorking}
          {...register('image', {
            required: isEditSession ? false : 'This field is required'
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          $variation="secondary"
          type="reset"
          disabled={isWorking}
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? 'Edit' : 'Create new'} cabin
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
