import React from 'react';

interface ListItemProps {
  index: number,
  item: string,
  setItems: React.Dispatch<React.SetStateAction<string[]>>
  isCrossedOut: boolean,
  setCrossedItems: React.Dispatch<React.SetStateAction<boolean[]>>
}
export default function ListItem(props: ListItemProps) {

  const [isEditing, setIsEditing] = React.useState(false);
  const [lastStored, setLastStored] = React.useState(props.item);

  const goToggleIsCrossedOut = () => {
    props.setCrossedItems((prev) => {
      let newItems = [...prev];
      newItems[props.index] = !newItems[props.index];
      return newItems;
    });
  }

  const goToggleEdit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setLastStored(props.item);
    if (props.item == '') {
      props.setItems((prev) => {
        let newItems = [...prev];
        newItems[props.index] = lastStored;
        return newItems;
      });
    }
    setIsEditing((prev) => !prev);
  }

  const goChangeItem = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setItems((prev) => {
      let newItems = [...prev];
      newItems[props.index] = event.target.value;
      return newItems;
    });
  }

  const goDelete = () => {
    props.setItems((prev) => {
      let newItems = [...prev];
      newItems.splice(props.index, 1);
      return newItems;
    });
    props.setCrossedItems((prev) => {
      let newItems = [...prev];
      newItems.splice(props.index, 1);
      return newItems;
    });
  }

  if (isEditing) {
    return (
      <div className="list-item">
        <form className='list-item__form' onSubmit={goToggleEdit}>
          <input
            type="text"
            name="itemName"
            id="itemName"
            className="list-item__input"
            value={props.item}
            onChange={goChangeItem}
            autoFocus
            onFocus={(e) => e.target.select()}
            onBlur={goToggleEdit}
          />
          <button
            className="material-symbols-outlined list-item__button done"
            type='submit'
          >
            done
          </button>
        </form>
      </div>
    );
  } else {
    return (
      <div className='list-item'>
        <div
          className={props.isCrossedOut
            ? 'list-item__text list-item__text--done'
            : 'list-item__text'}
          onClick={goToggleIsCrossedOut}
        >
          {props.item}
        </div>
        <div
          className="material-symbols-outlined list-item__button edit"
          onClick={goToggleEdit}
        >
          edit
        </div>
        <div
          className="material-symbols-outlined list-item__button delete"
          onClick={goDelete}
        >
          delete
        </div>
      </div>
    );
  }
}