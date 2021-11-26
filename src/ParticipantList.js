import React from 'react';
import './ParticipantList.css';

class ParticipantList extends React.Component {

    constructor(props) {
        super(props);
        this.textInput = React.createRef();
        this.pairsSection = React.createRef();
        this.state = {
            participants : [],
            pairs : [],
            secretShown : false
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
        let size = participants.length;
        if (size < 2) {
            alert("Brak uczestników!");
            this.setState({pairs : []});
            return;
        }

        let participantsWithPriority = [];
        for (let index = 0; index < size; index++) {
            let priority = 13 * Math.floor(Math.random() * 100);
            let data = {priority: priority, participant : participants[index]};
            participantsWithPriority.push(data);
        }

        participantsWithPriority.sort(function(a, b) {
            return a.priority > b.priority;
        });

        let newPairs = [];
        for (let i = 0; i < size; i++) {
            let indexTo = (i + 13) % size;
            if (i === indexTo) {
                indexTo = (indexTo + 1) % size;
            }
            console.log("from = " + i + ", to = " + indexTo);
            let pair = {first : participantsWithPriority[i].participant, second : participantsWithPriority[indexTo].participant};
            if (!newPairs.includes(pair)) {
                newPairs.push(pair);
            }
        }

        this.setState({pairs : newPairs});
    }

    reset = () => {
        this.setState({participants : [], pairs : []});
        this.pairsSection.current.visibility = "none";
    }

    showSecret = (secretShown) => {
        this.setState({secretShown : !secretShown})
    }

    render() {
        return (
            <>
                <div className="jumbotron jumbotron-fluid">
                    <div className="container bg-light">
                        <h1>Świąteczne losowanie</h1>
                        <div className="input-group my-input-group">
                            <input className="form-control" placeholder="Uczestnik" aria-label="Uczestnik" id="participant" name="participant" type="text" ref={this.textInput}></input>
                            <div className="input-group-append">
                                <button className="btn btn-outline-primary" name="send" onClick={this.addParticipant.bind(this, this.state.participants)}>Add</button>
                            </div>
                        </div>
                        <div className="my-list">
                            <h3>Uczestnicy:</h3>
                            <ul className="list-group">
                                {this.state.participants === undefined || this.state.participants.length === 0 ? <h5>Brak uczestników</h5> : <></>}
                                {this.state.participants.map((participant, index) => (
                                    <li className="list-group-item list-group-item-action" key={index} id={`participant` + index}>
                                        <div className="row">
                                            <div className="col-md">
                                                <span className="my-span">{participant}</span>
                                            </div>
                                            <div className="col-sm">
                                                <button type="button" className="btn btn-danger my-remove-btn" onClick={this.deleteParticipant.bind(this, index, this.state.participants)} aria-label="Close">
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
                            <button className="btn btn-primary my-btn" onClick={this.generate.bind(this, this.state.participants)}>Losuj</button>
                            <button className="btn btn-secondary my-btn" onClick={this.reset.bind(this)}>Wyczyść</button>
                        </div>
                        <div className="my-list" ref={this.pairsSection}>
                            <h3>Pary:</h3>
                            <ul className="list-group">
                                {this.state.pairs === undefined || this.state.pairs.length === 0 ? <h5>Brak par, dodaj uczestników i kliknij przycisk losuj</h5> : <></>}
                                {this.state.pairs.map((pair, index) => (
                                    <li className="list-group-item" key={index} id={`pair` + index}>
                                        <div className="row">
                                            <div className="col-md">
                                                {pair.first}
                                            </div>
                                            <div className="col-sm">
                                                - 
                                            </div>
                                            <div className="col-md">
                                            {pair.second}
                                            </div>
                                        </div>   
                                    </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <button className="btn btn-danger" onClick={this.showSecret.bind(this, this.state.secretShown)}>Pokaż sekret</button>
                        <div className="container my-image">
                            {this.state.secretShown ? <img src={process.env.PUBLIC_URL + '/dupsko.jpg'} alt="Easter egg" height="30%" width="50%"/> : <></>}
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