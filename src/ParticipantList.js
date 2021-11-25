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
            alert("No participants available!");
            this.setState({pairs : []});
            return;
        }
        if (participants.length % 2 !== 0) {
            alert("Number of participants is not even!");
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
                <div className="Div-main">
                    <div>
                        <div>
                            <label>Name</label>
                            <input id="participant" name="participant" type="text" ref={this.textInput}></input>
                            <button name="send" onClick={this.addParticipant.bind(this, this.state.participants)}>Add</button>
                        </div>
                        <div>
                            <p>Participants list:</p>
                            <ul>
                                {this.state.participants.map((participant, index) => (
                                    <li key={index} id={`participant` + index}>
                                        {participant}
                                        <button onClick={this.deleteParticipant.bind(this, index, this.state.participants)}>X</button>
                                    </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div>
                            <button onClick={this.generate.bind(this, this.state.participants)}>Generate</button>
                            <button onClick={this.reset.bind(this)}>Reset</button>
                        </div>
                        <div ref={this.pairsSection}>
                            <p>Pairs:</p>
                            <ul>
                                {this.state.pairs.map((pair, index) => (
                                    <li key={index} id={`pair` + index}>
                                        {pair.first.participant} - {pair.second.participant}
                                    </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="Div-footer">
                            <footer>Made by Jacek Noga</footer>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default ParticipantList;