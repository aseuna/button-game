<template>
    <div class="boxContainer" id="mainContainer">
        <h1>Press the button</h1>
        <b-button 
        id="b-button"
        @click="spendPoint"
        variant="success"
        v-bind:disabled="buttonDisabled"
        >{{remainingClicks}}
        </b-button>
        
        <div id="refreshPoints" v-if="this.remainingClicks == 0">
            <h4>You are out of points, click to gain additional 20 points.</h4>
            <b-button
            @click="refreshPoints"
            >
            Refresh points
            </b-button>
        </div>
    </div>
</template>

<script>
const axios = require('axios');

export default {
    name: 'MainView',
    components: {
    },
    props: {
    },
    data(){
        return{
            remainingClicks: localStorage.remainingClicks || 20,
            buttonDisabled: (localStorage.buttonDisabled == "true") || false
        }
    },
    mounted(){
        // fetches variables from localstorage
        if(localStorage.remainingClicks) this.remainingClicks = localStorage.remainingClicks;
        if(localStorage.buttonDisabled) this.buttonDisabled = (localStorage.buttonDisabled == "true");
    },
    methods:{
        spendPoint: function(){
            // sending http post request to backend
            // post request inform server that the button has been pressed

            axios.post(process.env.VUE_APP_API_URI || '/api/button_game')
            .then((response) => {

                // functionality when incresing the number was succesful
                if(response.data.incrementation === "SUCCESS"){
                    
                    // popup toast to inform user of the distance to the next winning number
                    const t = this.$createElement;
                    const infoMsg = t(
                        'p',
                        { class: ['text-center', 'mb-0'] },
                        [
                            t("strong",{}, "Next winning number is " + response.data.distance + " clicks away!")
                        ]
                    );
                    this.$bvToast.toast([infoMsg], {
                    title: "Info!",
                    toaster: "b-toaster-top-left",
                    variant: "info",
                    solid: false,
                    appendToast: false,
                    autoHideDelay: 1000
                    });
                    this.$bvToast.show();

                    // lower player points and adding possible bonus points
                    this.remainingClicks = this.remainingClicks - 1;
                    this.remainingClicks = this.remainingClicks + response.data.bonus_points; // data.bonus_points can be 0

                    // If user gained bonus points, create a popup toast to inform user
                    if(response.data.bonus_points !== 0){
                        const h = this.$createElement;
                        const successMsg = h(
                            'p',
                            { class: ['text-center', 'mb-0'] },
                            [
                                h("strong",{}, "You gained additional " + response.data.bonus_points + " points!")
                            ]
                        );
                        this.$bvToast.toast([successMsg], {
                        title: "Success!",
                        toaster: "b-toaster-top-right",
                        variant: "success",
                        solid: false,
                        appendToast: false,
                        autoHideDelay: 1000
                        });
                        this.$bvToast.show();
                    }
                // functionality when incresing the number failed
                }else{
                    // Informs wit ha popup toast user if connection to database has failed
                    const h = this.$createElement;
                    const dangerMsg = h(
                        'p',
                        { class: ['text-center', 'mb-0'] },
                        [
                            h("strong",{}, "Failed to reach the database, no cchange in points")
                        ]
                    );
                    this.$bvToast.toast([dangerMsg], {
                    title: "Alert!",
                    toaster: "b-toaster-bottom-right",
                    variant: "danger",
                    solid: false,
                    appendToast: false,
                    });
                    this.$bvToast.show();
                }
            })
            .catch(function(error){
                // eslint-disable-next-line no-console
                console.log(error);
            });
        },
        // gives player 20 points
        refreshPoints: function(){
            this.remainingClicks = 20;
        }
    },
    // watchers for variables that track remaining clicks and wheter button is disabled
    watch: {
        remainingClicks: function(clicks) {
            localStorage.remainingClicks = clicks;
            if(clicks === 0){
                this.buttonDisabled = true;
            }else{
                this.buttonDisabled = false;
            }
        },
        buttonDisabled: function(disabled){
            localStorage.buttonDisabled = disabled;
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#mainContainer{
    margin-top: 180px;
}

#b-button{
    width: 200px;
    height: 200px;
    border-radius: 100px;
    font-size: 50px;
    margin-bottom: 30px;
}
</style>