import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom'
import PageHaeder from '../../components/PageHeader';
import './styles.css';
import Input from '../../components/Input';
import warningIcon from '../../assets/images/icons/warning.svg';
import Textarea from '../../components/TextArea';
import Select from '../../components/Select';
import api from '../../services/api';

function TeacherForm() {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setwhatsapp] = useState('');
  const [bio, setBio] = useState('');

  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');

  const scheduleItemsDefault = [{ week_day: 0, from: '08:00', to: '14:00' }];
  const history = useHistory();
  const [scheduleItems, setScheduleItems] = useState(scheduleItemsDefault);

  async function addNewscheduleItem() {
    const scheduleItem = { week_day: scheduleItems.length, from: '', to: '' };

    await setScheduleItems([...scheduleItems, scheduleItem]);
    console.log(scheduleItems);
  }

  function handleCreateClass(event: FormEvent) {
    event.preventDefault();
    const body = {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost: Number(cost),
      schedule: scheduleItems,
    };
    api
      .post('/classes', body)
      .then(() => {
        alert('Cadastro realizado com sucesso')
        history.push('/study')
      })
      .catch((erro) => console.log(erro));

    console.log(body);
  }

  async function setSchecudeleItemValue(
    position: number,
    field: string,
    value: string
  ) {
    const updatesScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if (index === position) {
        return { ...scheduleItem, [field]: value };
      }

      return scheduleItem;
    });
    setScheduleItems(updatesScheduleItems);
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHaeder
        title="Que incrível que você quer dar aulas"
        description="O primeiro passo é preencher esse formulário de inscrição"
      ></PageHaeder>

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>
            <Input
              name="name"
              label="Nome completo:"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
            <Input
              type="url"
              name="avatar"
              label="Avatar"
              value={avatar}
              onChange={(event) => {
                setAvatar(event.target.value);
              }}
            />
            <Input
              name="whatsapp"
              label="Whatsapp"
              value={whatsapp}
              onChange={(event) => {
                setwhatsapp(event.target.value);
              }}
            />{' '}
            <Textarea
              name="bio"
              label="Biografia"
              value={bio}
              onChange={(event) => {
                setBio(event.target.value);
              }}
            />
          </fieldset>
          <fieldset>
            <legend>Sobre a aula</legend>
            <Select
              value={subject}
              onChange={(event) => {
                setSubject(event.target.value);
              }}
              options={[
                { value: 'Artes', label: 'Artes' },
                { value: 'História', label: 'Historia' },
                { value: 'Ciêcias', label: 'Ciêcias' },
                { value: 'Português', label: 'Português' },
                { value: 'Matemẫtica', label: 'Matemẫtica' },
              ]}
              name="subject"
              label="Materia"
            />
            <Input
              name="cost"
              label="Custo da sua hora por aula"
              value={cost}
              onChange={(event) => {
                setCost(event.target.value);
              }}
            />
          </fieldset>
          <fieldset>
            <legend>
              Horáios disponíveis
              <button type="button" onClick={addNewscheduleItem}>
                + Novo Horário
              </button>
            </legend>
            {scheduleItems.map((scheduleItem, index) => {
              return (
                <div className="schedule-item" key={index}>
                  <Select
                    onChange={(event) => {
                      setSchecudeleItemValue(
                        index,
                        'week_day',
                        event.target.value
                      );
                    }}
                    options={[
                      { value: '0', label: 'Domingo' },
                      { value: '1', label: 'Segunda-feira' },
                      { value: '2', label: 'Terça-feira' },
                      { value: '3', label: 'Quarta-feira' },
                      { value: '4', label: 'Quinta-feira' },
                      { value: '5', label: 'Sexta-feira' },
                      { value: '6', label: 'Sabado' },
                    ]}
                    value={scheduleItem.week_day}
                    name="week_day"
                    label="Dia da Semana"
                  />
                  <Input
                    name="from"
                    label="De"
                    type="time"
                    onChange={(event) => {
                      setSchecudeleItemValue(index, 'from', event.target.value);
                    }}
                    value={scheduleItem.from}
                  />
                  <Input
                    value={scheduleItem.to}
                    name="to"
                    label="Até"
                    type="time"
                    onChange={(event) => {
                      setSchecudeleItemValue(index, 'to', event.target.value);
                    }}
                  />
                </div>
              );
            })}
          </fieldset>
          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
              Importante! <br />
              Preencha todos os dados
            </p>
            <button type="submit">Salvar Cadastro</button>
          </footer>{' '}
        </form>
      </main>
    </div>
  );
}

export default TeacherForm;
