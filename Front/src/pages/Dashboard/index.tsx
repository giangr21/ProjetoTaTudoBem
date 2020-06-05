import React, { useCallback, useRef } from 'react'
import './style.css'
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useHistory } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: any) => {
      // try {
      //   const response = await api.post('sessions', {
      //     email,
      //     senha
      //   });
      //   const { token, user } = response.data;
      //   console.log(token, user);
        console.log(history.location);
        history.push('/chat?username=gian&room=javascript');

      // } catch (err) {
      // }
    },
    [history],
  );

  return (
    <div className="join-container">
			<header className="join-header">
				<h1><i className="fas fa-smile"></i> ChatCord</h1>
			</header>
			<main className="join-main">
				<Form ref={formRef} onSubmit={handleSubmit}>
					<div className="form-control">
						<label>Username</label>
						<input
							type="text"
							name="username"
							id="username"
							placeholder="Enter username..."
							required
						/>
					</div>
					<div className="form-control">
						<label >Room</label>
						<select name="room" id="room">
							<option value="JavaScript">JavaScript</option>
							<option value="Python">Python</option>
							<option value="PHP">PHP</option>
							<option value="C#">C#</option>
							<option value="Ruby">Ruby</option>
							<option value="Java">Java</option>
						</select>
					</div>
					<button type="submit" className="btn">Join Chat</button>
				</Form>
			</main>
		</div>
  );
}

export default Dashboard;
