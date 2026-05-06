// Ticket workflow ITSM (ServiceNow style)

import { TicketState } from "./ticket.model.js";

interface State {
  name: string;
  transitions: TicketState[];
}

interface Transition {
  from: TicketState | TicketState[];
  to: TicketState;
  name: string;
}

interface TicketWorkflow {
  states: Record<TicketState, State>;
  transitions: Record<string, Transition>;
  isValidTransition: (currentState: TicketState, nextState: TicketState) => boolean;
  getTransitionName: (fromState: TicketState, toState: TicketState) => string | null;
}

const ticketWorkflow: TicketWorkflow = {
  states: {
    NEW: {
      name: 'New',
      transitions: ['IN_PROGRESS', 'CANCELED']
    },
    IN_PROGRESS: {
      name: 'In Progress',
      transitions: ['ON_HOLD', 'RESOLVED', 'CANCELED']
    },
    ON_HOLD: {
      name: 'On Hold',
      transitions: ['IN_PROGRESS', 'CANCELED']
    },
    RESOLVED: {
      name: 'Resolved',
      transitions: ['IN_PROGRESS', 'CLOSED']
    },
    CLOSED: {
      name: 'Closed',
      transitions: []
    },
    CANCELED: {
      name: 'Canceled',
      transitions: []
    }
  },

  transitions: {
    start_progress: {
      from: 'NEW',
      to: 'IN_PROGRESS',
      name: 'Start Progress'
    },
    put_on_hold: {
      from: 'IN_PROGRESS',
      to: 'ON_HOLD',
      name: 'Put on Hold'
    },
    resume_progress: {
      from: 'ON_HOLD',
      to: 'IN_PROGRESS',
      name: 'Resume Progress'
    },
    resolve_ticket: {
      from: 'IN_PROGRESS',
      to: 'RESOLVED',
      name: 'Resolve Ticket'
    },
    reopen_ticket: {
      from: 'RESOLVED',
      to: 'IN_PROGRESS',
      name: 'Reopen Ticket'
    },
    close_ticket: {
      from: 'RESOLVED',
      to: 'CLOSED',
      name: 'Close Ticket'
    },
    cancel_ticket: {
      from: ['NEW', 'IN_PROGRESS', 'ON_HOLD'],
      to: 'CANCELED',
      name: 'Cancel Ticket'
    }
  },

  isValidTransition: (currentState: TicketState, nextState: TicketState) => {
    const state = ticketWorkflow.states[currentState];
    return state && state.transitions.includes(nextState);
  },

  getTransitionName: (fromState: TicketState, toState: TicketState) => {
    for (const [key, transition] of Object.entries(ticketWorkflow.transitions)) {
      const isFrom = Array.isArray(transition.from) 
        ? transition.from.includes(fromState)
        : transition.from === fromState;
      
      if (isFrom && transition.to === toState) {
        return transition.name;
      }
    }
    return null;
  }
};

export default ticketWorkflow;