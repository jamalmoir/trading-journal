import React, { useState } from 'react';
import { connect } from 'react-redux';
import Types from 'Types';
import { TextInput } from '../TextInput';
import { Dispatch } from 'redux';
import ReactDatePicker from 'react-datepicker';
import { TristateCheckbox } from '../TristateCheckbox';
import ReactTags, { Tag } from 'react-tag-autocomplete';
import './tradeFilter.scss';
import { setTradeFilters } from '../../redux/actions/journal';


interface TradeFilterProps {
  onSetTradeFilters: (filters: Types.TradeFilters) => null;
}

interface Tags {
  [index: string]: any;
  tags: {
    tags: Tag[];
    suggestions: Tag[]
  },
  emotions: {
    tags: Tag[];
    suggestions: Tag[]
  }
}

const TradeFilterComponent = (props: TradeFilterProps) => {
  const initialFilters: Types.TradeFilters = {
    instrument: null,
    strategy: null,
    kind: '',
    rating: '',
    entryDate: null,
    exitDate: null,
    profit: null,
    hitTakeProfit: null,
    flagged: null,
    managed: null,
    tags: null,
    emotions: null,
  }

  const intialTags: Tags = {
    tags: {
      tags: [],
      suggestions: [],
    },
    emotions: {
      tags: [],
      suggestions: [],
    }
  }

  const [filters, setFilters]: [Types.TradeFilters, (val: any) => void] = useState(initialFilters)
  const [tags, setTags]: [Tags, (val: any) => void] = useState(intialTags);

  let updateFilter = (name: string, value: string | string[] | number | boolean | Date | null) => {
    setFilters({...filters, [name]: value})
    props.onSetTradeFilters(filters);
  }

  let handleTagDelete = (kind: string, i: number) => {
    let stateKey: string;

    if (kind === 'tags') {
      stateKey = 'tags';
    } else if (kind === 'emotions') {
      stateKey = 'emotions';
    }

    setTags({
      ...tags,
      [stateKey]: {
        ...tags[stateKey],
        tags: tags[stateKey].tags.filter((tag: Tag, index:number) => index !== i),
      }
    });

    updateFilter(stateKey, tags.reduce((t: Tag) => t.name));
  }

  let handleTagAddition = (kind: string, tag: Tag) => {
    let stateKey: string;

    if (kind === 'tags') {
      stateKey = 'tags';
    } else if (kind === 'emotions') {
      stateKey = 'emotions';
    }

    setTags({
      ...tags,
      [stateKey]: {
        ...tags[stateKey],
        tags: [...tags[stateKey].tags, tag]
      }
    })

    updateFilter(stateKey, tags.reduce((t: Tag) => t.name));
  }

  return (
    <div className="trade-filter-panel row bg-light">
      <div className="col-sm-12">Filters</div>
      <div className="trade-filter-group col-sm-3">
        <TextInput type="text"
              className="trade-filter form-control"
              placeholder="Instrument"
              value={ filters.instrument }
              onChange={ (e) => updateFilter('instrument', e.target.value) }/>
        <TextInput type="text"
              className="trade-filter form-control"
              placeholder="Strategy"
              value={ filters.strategy }
              onChange={ (e) => updateFilter('strategy', e.target.value) }/>
        <select className="trade-filter custom-select"
                value={ filters.kind }
                onChange={ (e) => updateFilter('kind', e.target.value) }>
          <option value="">Kind</option>
          <option value="long">Long</option>
          <option value="short">Short</option>
        </select>
      </div>

      <div className="trade-filter-group col-sm-3">
        <select className="trade-filter custom-select"
                value={ filters.rating }
                onChange={ (e) => updateFilter('rating', e.target.value) }>
          <option value="">Rating</option>
          <option value="-1">-1</option>
          <option value="0">0</option>
          <option value="1">1</option>
        </select>
        <div className="trade-filter trade-quick-create-date form-control">
          <ReactDatePicker
            selected={ filters.entryDate }
            onChange={ (d) => updateFilter('entryDate', d)}
            placeholderText="Entry Date"
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="time"
            dateFormat="MMMM d, yyyy h:mm aa"
          />
        </div>
        <div className="trade-filter trade-quick-create-date form-control">
          <ReactDatePicker
            selected={ filters.entryDate }
            onChange={ (d) => updateFilter('entryDate', d)}
            placeholderText="Exit Date"
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="time"
            dateFormat="MMMM d, yyyy h:mm aa"
          />
        </div>
      </div>

      <div className="trade-filter-group col-sm-4">
        <div className="trade-filter">
          <ReactTags tags={ tags.tags.tags }
            suggestions={ [] }
            handleDelete={ (i: number) => handleTagDelete('tags', i) }
            handleAddition={ (tag: Tag) => handleTagAddition('tags', tag) } 
            placeholder='Add Tag'
            allowNew/>
        </div>
        <div className="trade-filter">
          <ReactTags tags={ tags.emotions.tags }
            suggestions={ [] }
            handleDelete={ (i: number) => handleTagDelete('emotions', i) }
            handleAddition={ (tag: Tag) => handleTagAddition('emotions', tag) } 
            placeholder='Add Emotion'
            allowNew/>
        </div>
      </div>

      <div className="trade-filter-group col-sm-2">
        <div className="trade-filter form-check">
          <TristateCheckbox id='profit-tristate'
                            className="form-check-input"
                            onClick={ (val) => updateFilter('profit', val) } />
          <label className="form-check-label" htmlFor="profit-tristate">Profitable</label>
        </div>
        <div className="trade-filter form-check">
          <TristateCheckbox id='hit-take-profit-tristate'
                            className="form-check-input"
                            onClick={ (val) => updateFilter('hitTakeProfit', val) } />
          <label className="form-check-label" htmlFor="hit-take-profit-tristate">Hit Target</label>
        </div>
        <div className="trade-filter form-check">
          <TristateCheckbox id='flagged-tristate'
                            className="form-check-input"
                            onClick={ (val) => updateFilter('flagged', val) } />
          <label className="form-check-label" htmlFor="flagged-tristate">Flagged</label>
        </div>
        <div className="trade-filter form-check">
          <TristateCheckbox id='managed-tristate'
                            className="form-check-input"
                            onClick={ (val) => updateFilter('managed', val) } />
          <label className="form-check-label" htmlFor="mangaged-tristate">Managed</label>
        </div>
      </div>
    </div>
  )
};

const mapDispatchToProps = (dispatch: Dispatch<Types.RootAction>) => ({
  // @ts-ignore
  onSetTradeFilters: (filters: Types.TradeFilters) => dispatch(setTradeFilters(filters)),
});

export const TradeFilter = connect(null, mapDispatchToProps)(TradeFilterComponent);