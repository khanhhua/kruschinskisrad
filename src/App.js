import React from 'react';

import MemberForm from './MemberForm';
import KRad from './KRad';

export default function App() {
  const [members, setMembers] = React.useState(['Tom', 'Jerry', 'Piz']);
  
  return (
    <div className="container">
      <h1 className="display-4 mb-5">Kruschinskis Rad</h1>
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