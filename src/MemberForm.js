import React from "react";

export default function MemberForm({ members, onMemberAdd, onMemberRemove, onMemberChange }) {
  const [inputText, setInputText] = React.useState('');
  const onChange = React.useCallback((e) => {
    console.log(`Inner: ${e.target.value} Index: ${e.target.dataset.index}`);
    onMemberChange(e.target.value, e.target.dataset.index);
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
            <input
              className="form-control"
              data-index={index}
              onChange={onChange}
              value={item}
            />
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
