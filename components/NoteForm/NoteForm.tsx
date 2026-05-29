import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from 'formik';
import css from './NoteForm.module.css';

import { NoteSchema } from '../../schemas/noteSchema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
// import toast from 'react-hot-toast';

import { NoteFormData } from '@/types/note';
import { createNote } from '@/lib/api';
import toast from 'react-hot-toast';

interface NoteFormProps {
  onClose: () => void;
}

const NoteForm = ({ onClose }: NoteFormProps) => {
  const queryClient = useQueryClient();

  const initialValues: NoteFormData = {
    title: '',
    content: '',
    tag: 'Todo',
  };

  const createNoteMutation = useMutation({
    mutationFn: createNote,
    onSuccess: (note) => {
      queryClient.invalidateQueries({ queryKey: ['note'] });
      toast.success(`Note ${note.title} was created`);
      onClose();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleCreateNote = async (
    values: NoteFormData,
    actions: FormikHelpers<NoteFormData>,
  ) => {
    await createNoteMutation.mutateAsync(values);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={NoteSchema}
      onSubmit={handleCreateNote}
    >
      {({ errors, touched, dirty, isValid, isSubmitting }) => (
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <Field
              name="title"
              id="title"
              as="input"
              rows={8}
              className={css.input}
            />
            <ErrorMessage component="span" className={css.error} name="title" />
          </div>
          <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
            <Field
              name="content"
              id="content"
              as="textarea"
              className={css.textarea}
              rows={8}
            />
            <ErrorMessage
              component="span"
              className={css.error}
              name="content"
            />
          </div>
          <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <Field name="tag" id="tag" as="select" className={css.select}>
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>
          </div>
          <div className={css.actions}>
            <button
              type="button"
              className={css.cancelButton}
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={css.submitButton}
              disabled={!isValid || !dirty || isSubmitting}
            >
              Create note
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default NoteForm;
