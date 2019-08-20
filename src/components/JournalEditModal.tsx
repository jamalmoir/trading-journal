import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Types from 'Types';
import { modifyJournal } from '../redux/actions/journal';
import { TextInput } from './TextInput';


interface ModalProps {
  id: string
  journal: Types.Journal;
}

export const JournalEditModal = (props: ModalProps) => {
  const [journalName, setJournalName] = useState(props.journal.name);
  const dispatch = useDispatch();

  let updateJournalName = (val: string) => {
    setJournalName(val);
  }

  let updateJournal = () => {
    let modified = Object.assign({}, props.journal)
    modified.name = journalName;

    dispatch(modifyJournal(modified));
  }

  return (
    <div className="modal fade" role="dialog" id={ props.id }>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Modify Journal</h5>
            <button type="button" className="close" data-dismiss="modal">
              <span>&times;</span>
            </button>
          </div>

          <div className="modal-body">
            <div>
              <TextInput type="text"
                      className="form-control col-8"
                      placeholder="Journal name"
                      value={ journalName }
                      onChange={ (e) => updateJournalName(e.target.value) }
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            <button className="btn btn-outline-primary" type="button" onClick={ updateJournal } data-dismiss="modal">Submit</button>
          </div>

        </div>
      </div>
    </div>  
  )
}