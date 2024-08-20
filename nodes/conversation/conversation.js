module.exports = (RED) => {
    'use strict';

    const MIIBO_API_BASE_URL = 'https://api-mebo.dev';
    const MIIBO_API_PATH =  '/api';
    const REQUEST_URL = `${MIIBO_API_BASE_URL}${MIIBO_API_PATH}`;

    const main = function(config){
        const node = this;
        RED.nodes.createNode(node, config);

        /**
         * 実行時の処理
         */
        node.on('input', async (msg, send, done) => {
            try {
                console.log(typeof msg.payload, msg.payload, config);

                const MIIBO_API_KEY = node.credentials.miiboAPIKey;
                const MIIBO_AGENT_ID = node.credentials.miiboAgentId;

                const postData = {
                    api_key: MIIBO_API_KEY, //required
                    agent_id: MIIBO_AGENT_ID, //required
                    utterance: '', //required
                    uid: config.uuid || msg.payload.uid || `` //optional
                }

                if(typeof msg.payload === 'string'){
                    postData.utterance = msg.payload;
                }
                else if(typeof msg.payload === 'object' && msg.payload.utterance){
                    postData.utterance = msg.payload.utterance || ``;
                    postData.uid = msg.payload.uid || postData.uid;
                }

                console.log('postData:', postData);
                const REQUEST_OPTIONS = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(postData)
                };

                const response = await fetch(REQUEST_URL, REQUEST_OPTIONS);
                msg.payload = await response.json();
                console.log(msg.payload);
                send(msg);
                done();
            } catch (error) {
                console.log(error);
                done(error);
            }
        });
    }

    RED.nodes.registerType("conversation", main, {
        credentials: {
            miiboAPIKey: {type:"password"},
            miiboAgentId: {type:"password"}
        }
    });
}