import React from 'react';
import './ParticipantList.css';

class ParticipantList extends React.Component {

    constructor(props) {
        super(props);
        this.textInput = React.createRef();
        this.pairsSection = React.createRef();
        this.state = {
            participants : [],
            pairs : []
        }
    }

    addParticipant = (participants) => {
        let participant = this.textInput.current.value;
        if (participant === null || participant === "") {
            alert("Podano niepoprawne imię uczestnika!");
            return;
        }
        if (Object.values(participants).indexOf(participant) > -1) {
            alert("Podany uczestnik już został dodany!");
            return;
        }
        if (participant.includes("dupa")) {
            alert("Elegancja francja");
        }
        let newParticipants = participants.slice(0, participants.size);
        newParticipants.push(participant);
        this.textInput.current.value = "";
        this.setState({participants : newParticipants});
    }

    deleteParticipant = (index, participants) => {
        participants.splice(index, 1);
        this.setState({participants : participants});
    }

    generate = (participants) => {
        if (participants.length < 1) {
            alert("Brak uczestników!");
            this.setState({pairs : []});
            return;
        }
        if (participants.length % 2 !== 0) {
            alert("Liczba uczestników jest nieparzysta!");
            this.setState({pairs : []});
            return;
        }
        let participantsWithPriority = [];
        for (let index = 0; index < participants.length; index++) {
            let priority = 13 * Math.floor(Math.random() * 100);
            let data = {priority: priority, participant : participants[index]};
            participantsWithPriority.push(data);
        }

        participantsWithPriority.sort(function(a, b) {
            return a.priority > b.priority;
        });

        let newPairs = [];
        for (let i = 0; i < participants.length; i = i + 2) {
            let pair = {first : participantsWithPriority[i], second : participantsWithPriority[i+1]};
            newPairs.push(pair);
        }

        this.setState({pairs : newPairs});
    }

    reset = () => {
        this.setState({participants : [], pairs : []});
        this.pairsSection.current.visibility = "none";
    }

    render() {
        return (
            <>
                <div className="jumbotron jumbotron-fluid">
                    <div className="container bg-light">
                        <h1>Świąteczne losowanie</h1>
                        <div className="input-group">
                            <input className="form-control" placeholder="Uczestnik" aria-label="Uczestnik" id="participant" name="participant" type="text" ref={this.textInput}></input>
                            <div className="input-group-append">
                                <button className="btn btn-outline-primary" name="send" onClick={this.addParticipant.bind(this, this.state.participants)}>Add</button>
                            </div>
                        </div>
                        <div>
                            <h3>Uczestnicy:</h3>
                            <ul className="list-group">
                                {this.state.participants === null || this.state.participants.length === 0 ? <h5>Brak uczestników</h5> : <></>}
                                {this.state.participants.map((participant, index) => (
                                    <li className="list-group-item list-group-item-action" key={index} id={`participant` + index}>
                                        <div className="row">
                                            <div className="col-md">
                                                <span>{participant}</span>
                                            </div>
                                            <div className="col-md"></div>
                                            <div className="col-sm">
                                                <button type="button" className="btn btn-danger" onClick={this.deleteParticipant.bind(this, index, this.state.participants)} aria-label="Close">
                                                    Usuń
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="form-input">
                            <button className="btn btn-primary" onClick={this.generate.bind(this, this.state.participants)}>Losuj</button>
                            <button className="btn btn-secondary" onClick={this.reset.bind(this)}>Wyczyść</button>
                        </div>
                        <div ref={this.pairsSection}>
                            <h3>Pary:</h3>
                            <ul className="list-group">
                                {this.state.pairs === null || this.state.pairs.length === 0 ? <h5>Brak par, dodaj uczestników i kliknij przycisk losuj</h5> : <></>}
                                {this.state.pairs.map((pair, index) => (
                                    <li className="list-group-item" key={index} id={`pair` + index}>
                                        <div className="row">
                                            <div className="col-md">
                                                {pair.first.participant}
                                            </div>
                                            <div className="col-sm">
                                                - 
                                            </div>
                                            <div className="col-md">
                                            {pair.second.participant}
                                            </div>
                                        </div>   
                                    </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="align-bottom">
                            <footer>Made by Jacor</footer>
                        </div>
                    </div>   
                </div>
            </>
        );
    }
}

export default ParticipantList;