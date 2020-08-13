import React from 'react';
import wahtsappIcon from '../../assets/images/icons/whatsapp.svg';
import './styles.css';
import api from '../../services/api';

export interface Teacher {
  id: number;
  subject: string;
  cost: number;
  name: string;
  avatar: string;
  whatsapp: string;
  bio: string;
}

interface TeacherItemProps {
  teacher: Teacher;
}

const TacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {

  function createNewConnection(){
    api.post('/connections', {
      user_id: teacher.id
    })
  }

  return (
    <div>
      <article className="teacher-item">
        <header>
          <img src={teacher.avatar} alt={teacher.name} />
          <div>
            <strong>{teacher.name}</strong>
            <span>{teacher.subject}</span>
          </div>
        </header>
        <p>{teacher.bio}</p>
        <footer>
          <p>
            Preço/Hora
            <strong>R$ {teacher.cost}</strong>
          </p>
          <a target="_blank" onClick={createNewConnection} href={`https://wa.me/${teacher.whatsapp}`} type="button">
            <img src={wahtsappIcon} alt="WahtsApp" />
            Entrar em contado
          </a>
        </footer>
      </article>
    </div>
  );
};

export default TacherItem;
