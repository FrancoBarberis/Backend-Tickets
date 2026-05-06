// Ticket workflow

type TicketState = 'draft' | 'open' | 'in_progress' | 'pending_review' | 'hold' | 'closed';

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
    draft: {
      name: 'Draft',
      transitions: ['open']
    },
    open: {
      name: 'Open',
      transitions: ['in_progress', 'closed', 'hold']
    },
    in_progress: {
      name: 'In Progress',
      transitions: ['open', 'pending_review', 'closed', 'hold']
    },
    pending_review: {
      name: 'Pending Review',
      transitions: ['in_progress', 'closed', 'open']
    },
    hold: {
      name: 'On Hold',
      transitions: ['open', 'in_progress', 'closed']
    },
    closed: {
      name: 'Closed',
      transitions: ['open']
    }
  },

  transitions: {
    draft_to_open: {
      from: 'draft',
      to: 'open',
      name: 'Open Ticket'
    },
    open_to_in_progress: {
      from: 'open',
      to: 'in_progress',
      name: 'Start Work'
    },
    in_progress_to_review: {
      from: 'in_progress',
      to: 'pending_review',
      name: 'Submit for Review'
    },
    any_to_hold: {
      from: ['open', 'in_progress', 'pending_review'],
      to: 'hold',
      name: 'Put on Hold'
    },
    hold_to_open: {
      from: 'hold',
      to: 'open',
      name: 'Resume Ticket'
    },
    any_to_closed: {
      from: ['open', 'in_progress', 'pending_review', 'hold'],
      to: 'closed',
      name: 'Close Ticket'
    },
    closed_to_open: {
      from: 'closed',
      to: 'open',
      name: 'Reopen Ticket'
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