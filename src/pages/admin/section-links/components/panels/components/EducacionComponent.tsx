import React from 'react';

type PropsPanel = {
  dataUser: any;
};
export const EducacionComponent = (props: PropsPanel) => {
  return (
    <>
      <div className="grid gap-4 grid-cols-4">
        <div className="col-span-2 flex flex-col">
          <label>Nivel de educación</label>
          <input
            type="text"
            value={
              props.dataUser.user.education.educational_level.description ?? ''
            }
            disabled
          />
        </div>
        <div className="col-span-2 flex flex-col">
          <label>Nivel de ingles</label>
          <input
            type="text"
            value={
              props.dataUser.user.education.english_level.description ?? ''
            }
            disabled
          />
        </div>
      </div>
      <div className="grid gap-4 grid-cols-4 mt-5">
        <div className="col-span-4 flex flex-col">
          <label>Experiencia</label>
          <textarea
            className={'w-full rounded-lg border-2 resize-none p-2'}
            rows={4}
            value={props.dataUser.user.education.description ?? ''}
            disabled
          ></textarea>
        </div>
      </div>
    </>
  );
};
