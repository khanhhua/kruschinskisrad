import React from "react";

export default function MemberForm({ members, onMemberAdd, onMemberRemove, onMemberChange }) {
  const [inputText, setInputText] = React.useState('');
  const [activeIndex, setActiveIndex] = React.useState(null);
  const activeInputRef = React.useRef();
  
  const onChange = React.useCallback((e) => {
    const {target} = e;

    const selectionStart = target.selectionStart;
    setTimeout(() => {
      if (activeInputRef.current) {
        activeInputRef.current.focus();
        activeInputRef.current.setSelectionRange(selectionStart, selectionStart);
      }
    }, 0);

    onMemberChange(target.value, target.dataset.index);
  });

  const onKeyPress = React.useCallback((e) => {
    if (e.charCode !== 13) {
      return;
    }

    onMemberAdd(e.target.value);
    setInputText('');
  });

  const onRemoveClick = React.useCallback((e) => {
    onMemberRemove(e.target.dataset.index);
  });

  return (
    <div className="list-group">
      {members.map((item, index) => (
        <div className="list-group-item" key={item}>
          <div className="list-group-control">
            {index !== activeIndex &&
            <span
              className="form-control"
              onClick={() => {
                setActiveIndex(index);
                setTimeout(() => {
                  if (activeInputRef.current) {
                    activeInputRef.current.focus();
                  }
                }, 0);
              }}
            >{item}</span>
            }
            {index === activeIndex &&
            <input
              ref={activeInputRef}
              className="form-control"
              value={item}
              data-index={index}
              onChange={onChange}
            />
            }
          </div>
          <button
            data-index={index}
            className="btn btn-sm btn-secondary float-right mt-1"
            onClick={onRemoveClick}
          >
            &times;
          </button>
        </div>
      ))}
      <div className="list-group-item">
        <input
          className="form-control"
          onKeyPress={onKeyPress}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter your member"
          value={inputText}
        />
      </div>
    </div>
  );
}
