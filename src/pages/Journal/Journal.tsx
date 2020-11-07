import React, { Component } from 'react'
import { connect } from 'react-redux'
import { match } from 'react-router'
import { Dispatch } from 'redux'
import Types from 'Types'
import { Heading } from '../../components/Heading'
import { TradeQuickCreate } from '../../components/TradeQuickCreate'
import { routeChange } from '../../redux/actions/app'
import { setActiveJournal } from '../../redux/actions/journal'
import { JournalAction } from '../../redux/reducers/journal'
import { getFilteredTrades } from '../../redux/selectors/journal'
import { Sidebar } from '../../components/Sidebar'
import ReactDataGrid from 'react-data-grid'
import './journal.scss'
import { push } from 'connected-react-router'
import { Breadcrumbs } from '../../components/Breadcrumbs'
import { TradeFilter } from '../../components/TradeFilter'

interface JournalPageProps {
  journals: Types.Journal[]
  trades: Types.Trade[]
  match: match<{ journalId: string }>
  activeJournal: Types.Journal
  onSetActiveJournal: (journal: Types.Journal) => null
  onRouteChange: (route: any) => null
  onRowClick: (url: string) => null
}

const columns = [
  { key: 'instrument', name: 'Instrument' },
  { key: 'strategy', name: 'Strategy' },
  { key: 'kind', name: 'Kind' },
  { key: 'entryDate', name: 'Entry Date' },
  { key: 'entryPrice', name: 'Entry Price' },
  { key: 'positionSize', name: 'Position Size' },
  { key: 'stopLoss', name: 'Stop Loss' },
  { key: 'takeProfit', name: 'Take Profit' },
  { key: 'exitDate', name: 'Exit Date' },
  { key: 'exitPrice', name: 'Exit Price' },
  { key: 'pl', name: 'P/L' },
  { key: 'edit', name: 'Edit' },
]

class JournalPage extends Component<JournalPageProps> {
  constructor(props: JournalPageProps) {
    super(props)

    this.props.onRouteChange(this.props.match)

    if (this.props.journals.length) {
      let journal = this.props.journals.find(
        j => j.id === this.props.match.params.journalId
      )
      this.props.onSetActiveJournal(journal)
    }
  }

  componentDidUpdate(prevProps: JournalPageProps) {
    if (
      prevProps.journals.length !== this.props.journals.length &&
      this.props.journals.length &&
      this.props.activeJournal == null
    ) {
      let journal = this.props.journals.find(
        j => j.id === this.props.match.params.journalId
      )
      this.props.onSetActiveJournal(journal)
    }
  }

  getRows = (i: number) => {
		const trade = this.props.trades[i]

		if (!trade) return

    return {
			id: trade.id,
			journalId: trade.journalId,
      instrument: trade.instrument,
      strategy: trade.strategy,
      kind: trade.kind,
      entryDate: trade.entryDate ? trade.entryDate.toLocaleDateString() : null,
      entryPrice: trade.entryPrice,
      positionSize: trade.positionSize,
      stopLoss: trade.stopLoss,
      takeProfit: trade.takeProfit,
      exitDate: trade.exitDate ? trade.exitDate.toLocaleDateString() : null,
      exitPrice: trade.exitPrice,
      pl: trade.pl? trade.pl.toString() : null,
      edit: '',
    }
	}
	
	handleRowClick = (i: number, trade: any) => {
		const url = trade.journalId + '/trade/' + trade.id
		this.props.onRowClick(url)
	}

  render() {
    return (
      <div className="journal">
        <Sidebar components={[<TradeFilter />]} />

        <div className="content cell medium-10">
					<Breadcrumbs />
          {this.props.activeJournal ? (
            <Heading
              className="journal-heading"
              text={this.props.activeJournal.name}
            />
          ) : (
            ''
          )}
          {this.props.activeJournal ? (
            <TradeQuickCreate journal={this.props.activeJournal} />
          ) : (
            ''
          )}
					<div className="journal-trade-list">
						<ReactDataGrid
							columns={columns}
							rowGetter={this.getRows}
							onRowClick={this.handleRowClick}
							rowsCount={10}
						/>
					</div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: Types.RootState) => {
  return {
    trades: getFilteredTrades(state),
    journals: state.journal.journals,
    activeJournal: state.journal.activeJournal,
  }
}

const mapDispatchToProps = (dispatch: Dispatch<JournalAction>) => ({
  // @ts-ignore
  onRouteChange: (route: any) => dispatch(routeChange(route)),
  // @ts-ignore
  onSetActiveJournal: (journal: Types.Journal) =>
		dispatch(setActiveJournal(journal)),
  // @ts-ignore
	onRowClick: (url: string) => dispatch(push(url))
})

export const Journal = connect(
  mapStateToProps,
  mapDispatchToProps
)(JournalPage)
