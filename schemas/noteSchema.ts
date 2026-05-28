import * as yup from 'yup';

export const NoteSchema = yup.object().shape({
  title: yup
    .string()
    .trim()
    .required('Title cannot be empty')
    .min(3, 'Too Short!')
    .max(50, 'Too Long!'),
  content: yup
    .string()
    .trim()
    .required('Content cannot be empty')
    .min(2, 'Too Short!')
    .max(500, 'Too Long!'),
});
