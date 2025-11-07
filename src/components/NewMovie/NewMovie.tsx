/* eslint-disable max-len */
import { useState } from 'react';
import { TextField } from '../TextField';

const pattern =
  /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

type MovieForm = {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
};

interface Props {
  onAdd: (movie: MovieForm) => void;
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [form, setForm] = useState<MovieForm>({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const [count, setCount] = useState(0);

  const isFormValid =
    form.title.trim() !== '' &&
    form.imgUrl.trim() !== '' &&
    form.imdbUrl.trim() !== '' &&
    form.imdbId.trim() !== '' &&
    pattern.test(form.imgUrl) &&
    pattern.test(form.imdbUrl);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!isFormValid) {
      return;
    }

    onAdd({
      title: form.title.trim(),
      description: form.description.trim(),
      imgUrl: form.imgUrl.trim(),
      imdbUrl: form.imdbUrl.trim(),
      imdbId: form.imdbId.trim(),
    });

    setForm({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });

    setCount(count + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={form.title}
        onChange={newValue => setForm({ ...form, title: newValue })}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={form.description}
        onChange={newValue => setForm({ ...form, description: newValue })}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={form.imgUrl}
        onChange={newValue => setForm({ ...form, imgUrl: newValue })}
        required
        validate={value => pattern.test(value)}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={form.imdbUrl}
        onChange={newValue => setForm({ ...form, imdbUrl: newValue })}
        required
        validate={value => pattern.test(value)}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={form.imdbId}
        onChange={newValue => setForm({ ...form, imdbId: newValue })}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isFormValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
