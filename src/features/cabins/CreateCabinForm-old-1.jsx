// // noinspection JSValidateTypes,JSIgnoredPromiseFromCall
//
// import styled from 'styled-components';
//
// import Form from '../../ui/Form.jsx';
// import Input from '../../ui/Input.jsx';
// import FormRow from '../../ui/FormRow.jsx';
// import Button from '../../ui/Button.jsx';
// import FileInput from '../../ui/FileInput.jsx';
// import Textarea from '../../ui/Textarea.jsx';
// import { useForm } from 'react-hook-form';
// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { createEditCabin } from '../../services/apiCabins.js';
// import toast from 'react-hot-toast';
//
// function CreateCabinForm() {
//   const {
//     register,
//     handleSubmit,
//     formState,
//     reset,
//     getValues
//     /*placeholder*/
//   } = useForm();
//   const { errors } = formState;
//
//   const queryClient = useQueryClient();
//
//   const { isLoading: isCreating, mutate: createNewCabin } = useMutation({
//     mutationFn: createEditCabin,
//     onSuccess: () => {
//       toast.success(`New cabin has been successfully created`);
//       queryClient.invalidateQueries({ queryKey: ['cabins'] });
//       reset();
//     },
//     onError: (error) => toast.error(error.message)
//   });
//
//   function onSubmit(data) {
//     console.log(data);
//     createNewCabin({ ...data, image: data.image[0] });
//   }
//   function onError(errors) {
//     // console.log(errors);
//   }
//
//   return (
//     <Form onSubmit={handleSubmit(onSubmit, onError)}>
//       <FormRow
//         label="Cabin name"
//         inputName="name"
//         error={errors?.name?.message}
//       >
//         <Input
//           type="text"
//           id="name"
//           disabled={isCreating}
//           {...register('name', { required: 'This field is required' })}
//         />
//       </FormRow>
//
//       <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
//         <Input
//           type="number"
//           id="maxCapacity"
//           disabled={isCreating}
//           {...register('maxCapacity', {
//             required: 'This field is required',
//             min: { value: 1, message: 'Capacity should be at least 1' }
//           })}
//         />
//       </FormRow>
//
//       <FormRow label="Regular price" error={errors?.regularPrice?.message}>
//         <Input
//           type="number"
//           id="regularPrice"
//           disabled={isCreating}
//           {...register('regularPrice', {
//             required: 'This field is required',
//             min: { value: 1, message: 'Regular price should me at least 1' }
//           })}
//         />
//       </FormRow>
//
//       <FormRow label="Discount" error={errors?.discount?.message}>
//         <Input
//           type="number"
//           id="discount"
//           defaultValue={0}
//           disabled={isCreating}
//           {...register('discount', {
//             required: 'This field is required',
//             //custom VALIDATION of forms
//             validate: (value) =>
//               value < getValues().regularPrice ||
//               'Discount must be less then regular price'
//           })}
//         />
//       </FormRow>
//
//       <FormRow
//         label="Description for website"
//         error={errors?.description?.message}
//       >
//         <Textarea
//           type="number"
//           id="description"
//           defaultValue=""
//           disabled={isCreating}
//           {...register('description', { required: 'This field is required' })}
//         />
//       </FormRow>
//
//       <FormRow label="Cabin photo" error={errors?.image?.message}>
//         <FileInput
//           id="image"
//           accept="image/*"
//           disabled={isCreating}
//           {...register('image', { required: 'This field is required' })}
//         />
//       </FormRow>
//
//       <FormRow>
//         {/* type is an HTML attribute! */}
//         <Button $variation="secondary" type="reset" disabled={isCreating}>
//           Cancel
//         </Button>
//         <Button disabled={isCreating}>Create cabin</Button>
//       </FormRow>
//     </Form>
//   );
// }
//
// export default CreateCabinForm;
