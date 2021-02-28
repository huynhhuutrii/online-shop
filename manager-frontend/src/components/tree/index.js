import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCategories,
  updateCategories,
  deleteCategory,
} from '../../redux/actions/category.action';
import { findIndex } from 'lodash';
import { BsPencilSquare, BsFillTrashFill } from 'react-icons/bs';

function filter(arr, condition) {
  const index = findIndex(arr, condition);

  delete arr[index];
}

function getObjFromPath(cats, path) {
  let obj = null;

  for (let i = 0; i < path.length; ++i) {
    obj = cats[path[i]];

    if (obj.children.length > 0 && i + 1 < path.length) {
      return getObjFromPath(obj.children, path.slice(i + 1));
    } else {
      return obj;
    }
  }
}

function getArrayFromPath(cats, path) {
  let obj = null;
  let arr = [];

  for (let i = 0; i < path.length; ++i) {
    arr = cats;
    obj = cats[path[i]];

    if (obj.children.length > 0 && i + 1 < path.length) {
      return getArrayFromPath(obj.children, path.slice(i + 1));
    } else {
      return arr;
    }
  }
}

const TreeEditor = React.memo(function TreeEditor({
  catName = '',
  categoryImage = '',
  path = '0,0',
  currentPath = 0,
  id,
  ...props
}) {
  const [value, setValue] = useState(catName ?? '');
  const [showInput, setShowInput] = useState(false);

  const categories = useSelector((state) => state.categoryReducer.categories);
  const dispatch = useDispatch();

  const arrayOfPath = path
    .split(',')
    .slice(1)
    .map((path) => parseInt(path));
  const obj = getObjFromPath(categories, arrayOfPath);
  let arr = getArrayFromPath(categories, arrayOfPath);
  const onChangeName = (e) => {
    setValue(e.target.value);
  };

  const onToggleShowInput = () => {
    setShowInput((state) => !state);
  };

  const onSave = () => {
    obj.name = value;
    dispatch(updateCategories(obj)).then((result) => {
      if (result) {
        dispatch(setCategories(categories));
      }
    });
    dispatch(setCategories(categories));
    onToggleShowInput();
  };

  const onDelete = () => {
    const data = arr.splice(currentPath, 1);
    dispatch(deleteCategory(data[0]._id)).then((result) => {
      if (result) {
        dispatch(setCategories(categories));
      }
    });
  };

  const handleDragStart = (e) => {
    e.currentTarget.style.border = 'dashed';
    const dataToTransfer = {
      id: e.target.id,
      path,
    };
    e.dataTransfer.setData('text/plain', JSON.stringify(dataToTransfer));
  };

  const onDragOver = (e) => {
    e.preventDefault();
    e.target.style.backgroundColor = 'yellow';
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    e.target.style.backgroundColor = 'white';
  };

  const onDragEnd = (e) => {
    e.preventDefault();

    const currentDragData = e.dataTransfer.getData('text/plain');
    const jsonData = JSON.parse(currentDragData);
    const dragObjectPath = jsonData.path;

    e.target.style.backgroundColor = 'white';
    document.getElementById(jsonData.id).style.border = 'none';

    if (
      dragObjectPath === path ||
      findIndex(obj.children, (obj) => obj._id === jsonData.id) !== -1
    )
      return;
    const dragPath = dragObjectPath
      .split(',')
      .slice(1)
      .map((path) => parseInt(path));
    const dragObj = getObjFromPath(categories, dragPath);
    let dragArray = getArrayFromPath(categories, dragPath);
    filter(dragArray, (obj) => obj._id === dragObj._id);

    obj.children.push(dragObj);

    dispatch(setCategories(categories));

    console.log('paren id', id, 'child', dragObj._id);
  };

  return (
    <summary
      draggable
      id={id}
      onDragStart={handleDragStart}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDragEnd}
      style={{ outline: 'none' }}
      onClick={(e) => e.stopPropagation()}
    >
      {showInput ? (
        <div style={{ display: 'inline-block' }}>
          <input value={value} onChange={onChangeName} />
          <button
            style={{
              backgroundColor: '#1976D2',
              color: 'white',
              outline: 'none',
              border: 'none',
              padding: '3px',
              borderRadius: '3px',
              margin: '5px',
              width: '60px',
            }}
            onClick={onSave}
          >
            Save
          </button>
          <button
            style={{
              backgroundColor: '#D32F2F',
              color: 'white',
              outline: 'none',
              border: 'none',
              padding: '3px',
              borderRadius: '3px',
              margin: '5px',
              marginLeft: '0px',
              width: '60px',
            }}
            onClick={onToggleShowInput}
          >
            Cancel
          </button>
        </div>
      ) : (
        <div
          style={{
            width: '250px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* {categoryImage.length > 0 && (
            <img
              width="50px"
              height="50px"
              style={{ marginRight: 10 }}
              src={categoryImage}
              alt=""
            />
          )} */}

          <span style={{ fontSize: '20px', color: '#00315C' }}>{value}</span>
          <div>
            <BsPencilSquare
              color="green"
              size="18px"
              style={{ margin: '10px' }}
              onClick={onToggleShowInput}
            />
            <BsFillTrashFill color="red" size="18px" onClick={onDelete} />
          </div>
        </div>
      )}
    </summary>
  );
});

function Tree({ cats = [], level = 0, path = '0' }) {
  const style = { paddingLeft: level * 15 + 'px' };
  const [selectedIds, setSelectedIds] = useState([]);

  const toggleShowChildren = (e, id) => {
    e.stopPropagation();
    if (selectedIds.includes(id)) {
      setSelectedIds((state) => state.filter((idInArr) => idInArr !== id));
    } else {
      setSelectedIds((state) => [...state, id]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();

    console.log('drop');
  };

  return (
    <div style={style} onDrop={handleDrop}>
      {cats.map(
        (cat, index) =>
          cat && (
            <details
              style={{ cursor: 'pointer' }}
              key={cat._id}
              onClick={(e) => toggleShowChildren(e, cat._id)}
            >
              <TreeEditor
                id={cat._id}
                catName={cat.name}
                categoryImage={cat.categoryImage}
                path={path + `,${index}`}
                currentPath={index}
                {...cat}
              />
              {cat.children.length > 0 && (
                <Tree
                  cats={cat.children}
                  level={level + 2}
                  path={path + `,${index}`}
                />
              )}

              {/* {selectedIds.includes(cat._id) && cat.children.length > 0 && (

          )} */}
            </details>
          )
      )}
    </div>
  );
}

export default Tree;
