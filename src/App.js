import React from 'react';

import MemberForm from './MemberForm';
import KRad from './KRad';

const PUBLIC_URL = process.env.PUBLIC_URL;

export default function App() {
  React.useEffect(() => {
    const match = window.location.search ? window.location.search.match(/d=(.+)/) : null;
    if (!match) {
      return;
    }
    const state = atob(match[1]);
    const restoredMembers = state.split(',');

    setMembers(restoredMembers);
    window.history.replaceState(null, null, PUBLIC_URL + '/');
  }, []);

  const [members, setMembers] = React.useState(['Neo', 'Anderson', 'Morpheus']);
  
  const onShareClick = React.useCallback(() => {
    const membersStr = btoa(members.join(','));
    const baseUrl = PUBLIC_URL || `${window.location.protocol}//${window.location.host}`;
    const url = `${baseUrl}?d=${membersStr}`;
    navigator.clipboard.writeText(url);
  }, [members]);
  
  return (
    <div className="container">
      <h1 className="display-4 mb-5">Kruschinskis Rad</h1>
      <div className="row">
        <div className="col-2 offset-md-10">
          <button className="btn btn-sm btn-primary" onClick={onShareClick}>Copy shared link!</button>
        </div>
      </div>
      <div className="row">
        <div className="col-5 offset-md-1">
          <MemberForm
            members={members} 
            onMemberChange={(member, index) => {
              const updated = [...members];
              updated[index] = member;
              setMembers(updated);
            }}
            onMemberAdd={(member) => {
              const updated = [...members, member];
              setMembers(updated);
            }}
            onMemberRemove={(index) => {
              const updated = [...members];
              updated.splice(index, 1);
              setMembers(updated);
            }}
          />
        </div>
        <div className="col-5">
          <div id="arrow"></div>
          <KRad members={members} />
        </div>  
      </div>
    </div>
  );
}