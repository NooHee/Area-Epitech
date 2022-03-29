import { Card, CardMedia, Typography } from "@mui/material";
import React, { useEffect, useState } from "react"
import "../Selector.css"
import d from "../images/discord.png"
import c from "../images/cocktail.png"
import s from "../images/spotify.png"
import w from "../images/weather.png"
import t from "../images/time.png"
import tw from "../images/twitch.png"
import r from "../images/reddit.png"

export function Selector() {

    const [services, setServices] = useState('');
    const [currentService, setCurrentService] = useState('');
    const [actions, setActions] = useState('');
    const [currentAction, setCurrentAction] = useState('');

    function getIMG(name) {
        switch (name.label) {
            case 'discord':
                return d
            case 'cocktail':
                return c
            case 'twitch':
                return tw;
            case 'time':
                return t;
            case 'weather':
                return w;
            case 'spotify':
                return s;
            case 'reddit':
                return r;
            default: return '';
        }
    }

    function handleCurrentService(e) {
        setCurrentService(e)
        fetch(`http://localhost:8081/actions/${e}`)
            .then(response => response.json())
            .then(data => setActions(createActions(data.actions)))
    }

    function handleCurrentAction(e) {
        setCurrentAction({ name: e.name, description: e.description, args: e.args, id: e.id, color: e.color, service: e.service })
    }

    function createActions(actions) {
        var arr = actions.map((action, index) => action = (<Card
            onClick={() => handleCurrentAction({ name: actions[index].name, description: actions[index].description, args: actions[index].args, id: actions[index].id, color: actions[index].color, service: actions[index].service })} sx={{ backgroundColor: '#' + action.color.toString(16).slice(2), paddingTop: 5, paddingBottom: 5, marginBottom: 5, marginLeft: 5, marginRight: 5 }} key={index}>
            <center>
                <Typography variant="h4" sx={{ color: '#FFFFFF' }}>
                    {action.name}
                </Typography>
            </center>
        </Card>))
        return (arr);
    }
    function createServices(servs) {
        var arr = servs.map((service, index) => service = (
            <Card onClick={() => handleCurrentService(servs[index].label)} className="service" sx={{ backgroundColor: '#' + service.color.toString(16).slice(2), paddingTop: 10 }} key={index}>
                <center>
                    <CardMedia sx={{ width: 250, height: 250 }}
                        component="img"
                        image={getIMG(service)}
                        alt={service.label + ' logo'}
                    />
                    <Typography variant="h2" sx={{ color: '#FFFFFF' }} >
                        {service.name}
                    </Typography>
                    <br />
                </center>
            </Card>
        ))
        return (arr);
    }

    useEffect(() => {
        fetch("http://localhost:8081/services/actions")
            .then(response => response.json())
            .then(data => setServices(createServices(data.services)))
        if (currentService && window && window.opener) {
            var message = { service: currentService, name: currentAction.name, description: currentAction.description, args: currentAction.args, id: currentAction.id, color: currentAction.color }
            window.opener.postMessage(JSON.stringify({ action: message }), 'http://localhost:8080/panel')
            window.close()
        }
    }, [currentAction])

    return (
        <div>
            {services && !currentService ? services : ''}
            {currentService && services ? <center>
                <Typography variant="h4" >
                    {'Actions of ' + currentService.charAt(0).toUpperCase() + currentService.slice(1)}
                </Typography>
            </center>
                : ""}
            <br />
            {actions && !currentAction ? actions : ''}
            {currentAction && actions ? <div>
                {currentAction.name} <br /> {currentAction.description}
            </div> : ""}
        </div>
    )
}


export function SelectorBis() {
    const [services, setServices] = useState('');
    const [currentService, setCurrentService] = useState('');
    const [reactions, setReactions] = useState('');
    const [currentReaction, setCurrentReaction] = useState('');

    function getIMG(name) {
        switch (name.label) {
            case 'discord':
                return d
            case 'cocktail':
                return c
            case 'twitch':
                return tw;
            case 'time':
                return t;
            case 'weather':
                return w;
            case 'spotify':
                return s;
            case 'reddit':
                return r;
        }
    }
    function handleCurrentService(e) {
        setCurrentService(e)
        fetch(`http://localhost:8081/reactions/${e}`)
            .then(response => response.json())
            .then(data => setReactions(createReactions(data.reactions)))
    }

    function handleCurrentReaction(e) {
        setCurrentReaction({ name: e.name, description: e.description, oauth: e.oauth, args: e.args, id: e.id, color: e.color, service: e.service })
    }

    function createReactions(reacts) {
        var arr = reacts.map((reaction, index) => reaction = (<Card
            onClick={() => handleCurrentReaction({ name: reacts[index].name, description: reacts[index].description, oauth: reacts[index].oauth, args: reacts[index].args, id: reacts[index].id, color: reacts[index].color, service: reacts[index].service })} sx={{ backgroundColor: '#' + reaction.color.toString(16).slice(2), paddingTop: 5, paddingBottom: 5, marginBottom: 5, marginLeft: 5, marginRight: 5 }} key={index}>
            <center>
                <Typography variant="h4" sx={{ color: '#FFFFFF' }}>
                    {reaction.name}
                </Typography>
            </center>
        </Card>))
        return (arr);
    }
    function createServices(servs) {
        var arr = servs.map((service, index) => service = (<Card onClick={() => handleCurrentService(servs[index].label)} className="service" sx={{ backgroundColor: '#' + service.color.toString(16).slice(2), paddingTop: 10 }} key={index}>
            <center>
                <CardMedia sx={{ width: 250, height: 250 }}
                    component="img"
                    image={getIMG(service)}
                    alt={service.label + ' logo'}
                />
                <Typography variant="h2" sx={{ color: '#FFFFFF' }} >
                    {service.name}
                </Typography>
                <br />
            </center>
        </Card>))
        return (arr);
    }

    useEffect(() => {
        fetch("http://localhost:8081/services/reactions")
            .then(response => response.json())
            .then(data => setServices(createServices(data.services)))
        if (currentService && window && window.opener) {
            var message = { service: currentService, name: currentReaction.name, description: currentReaction.description, args: currentReaction.args, id: currentReaction.id, color: currentReaction.color }
            window.opener.postMessage(JSON.stringify({ reaction: message }), 'http://localhost:8080/panel')
            window.close()
        }
    }, [currentReaction])

    return (
        <div>
            {services && !currentService ? services : ''}
            {currentService && services ? <center>
                <Typography variant="h4" >
                    {'Reactions of ' + currentService.charAt(0).toUpperCase() + currentService.slice(1)}
                </Typography>
            </center> : ""}
            <br />
            {reactions && !currentReaction ? reactions : ''}
            {currentReaction && reactions ? <div>
                {currentReaction.name}
                <br />
                {currentReaction.description}
            </div> : ""}
        </div>
    )
}