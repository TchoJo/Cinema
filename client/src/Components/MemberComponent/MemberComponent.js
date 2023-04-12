import '../../App.css';
import utils  from '../../API/utils';
import { useState, useEffect } from 'react';
import {  useNavigate, useParams } from 'react-router-dom';
import SubscriptionsComponent from '../SubscriptionsComponent/SubscriptionsComponent';
import AddSubscriptionsComponent from '../AddSubscriptionComponent/AddSubscriptionComponent';

function MemberComponent() {
  const navigate = useNavigate();

  const token = sessionStorage["token"];
  let id = useParams().id;

  const [member, setMember] = useState([]);
  const [addSubSpan, setAddSubSpan] = useState({});

  useEffect(() => {
     function checkToken(token) {
    if(!token) {
      navigate("/login");
    }
    }
    checkToken(token);
  }, [token, navigate] );
  
useEffect(() => {
    async function getMember() {
      let membersData = await utils.getMembers();
      setMember(membersData.data.find(member => member._id === id)); 
    }
    getMember();
  },[member, id]);


  return (
    <div className="App">
      <h2 style={{background : "lime", color : 'black', fontSize: "32px"}}>
      {member.name}
      </h2>
                <ul>
                  {          
                      <li key={member._id}>
                        <span>
                        <hr />
                        <section>
                        <b> City </b> {member.city} <br />
                        <b> Email </b> {member.email} <br />
                        <button>Edit </button> &nbsp;
                        <button>Delete </button>
                        <br /> <br />
                        </section> 
                        <SubscriptionsComponent member={member.name} /> 
                      <span className='plus' key={member._id} onClick={() => setAddSubSpan({...addSubSpan, [member._id] : !addSubSpan[member._id]})}>
                        +
                        </span>
                        {
                          addSubSpan[member._id] && 
                          <AddSubscriptionsComponent  memberID={member._id} /> 
                        }
                        </span>  <br /> <br />
                      </li>
                    
      
              }
              </ul>
    </div>
  );
}

export default MemberComponent;
