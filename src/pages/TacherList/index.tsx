import React, { useState, FormEvent, useEffect } from 'react';

import './styles.css';
import PageHaeder from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';
import api from '../../services/api';

function TacherList() {
  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    if (subject && week_day && time) {
      api
        .get('/classes', {
          params: {
            subject,
            week_day,
            time,
          },
        })
        .then((response) => {
          setTeachers(response.data);
        });
    }
  }, [subject, week_day, time]);

  async function searchTeachers(event: FormEvent) {
    event.preventDefault();

    const response = await api.get('/classes', {
      params: {
        subject,
        week_day,
        time,
      },
    });
    setTeachers(response.data);
    console.log(response.data);
  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHaeder title="Estes são os proffys disponiveis.">
        <form action="subimit" id="search-teachers" onSubmit={searchTeachers}>
          <Select
            options={[
              { value: 'Artes', label: 'Artes' },
              { value: 'Historia', label: 'Historia' },
              { value: 'Ciêcias', label: 'Ciêcias' },
              { value: 'Português', label: 'Português' },
              { value: 'Matemẫtica', label: 'Matemẫtica' },
            ]}
            name="subject"
            label="Materia"
            value={subject}
            onChange={(event) => {
              setSubject(event.target.value);
            }}
          />

          <Select
            options={[
              { value: '0', label: 'Domingo' },
              { value: '1', label: 'Segunda-feira' },
              { value: '2', label: 'Terça-feira' },
              { value: '3', label: 'Quarta-feira' },
              { value: '4', label: 'Quinta-feira' },
              { value: '5', label: 'Sexta-feira' },
              { value: '6', label: 'Sabado' },
            ]}
            name="week_day"
            label="Dia da semana"
            value={week_day}
            onChange={(event) => {
              setWeekDay(event.target.value);
            }}
          />

          <Input
            type="time"
            name="time"
            label="Hora"
            value={time}
            onChange={(event) => {
              setTime(event.target.value);
            }}
          />

          <button type="submit">Buscar</button>
        </form>
      </PageHaeder>

      <main>
        {teachers.map((teacher: Teacher) => {
          return <TeacherItem teacher={teacher} key={teacher.id} />;
        })}
      </main>
    </div>
  );
}

export default TacherList;
