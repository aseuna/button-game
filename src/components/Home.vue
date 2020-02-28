<template>
    <div class="boxContainer" id="mainContainer">
        
        <b-button @click="onSubmit"
        variant="success"
        >Press Here
        </b-button>

        <div id="remainingClicks">Your remaining clicks: {{remainingClicks}}</div>
    </div>
</template>

<script>

//const Swal = require('sweetalert2');

export default {
    name: 'MainView',
    components: {
    },
    props: {
    },
    data(){
        return{
            remainingClicks: 20
        }
    },
    mounted(){
        if(localStorage.remainingClicks) this.remainingClicks = localStorage.remainingClicks;
    },
    methods:{
        onSubmit: function(){

            // sending http request to backend
            // at this point any post request t
            const config = {
                method: 'POST',
                headers: {
                    'content-type':'application/json'
                }
            };

            fetch('http://localhost:3000/api/button_game', config)
            .then(response => response.json())
            .then(data => {

                // eslint-disable-next-line no-console
                console.log(data.incrementation);
            })
            .catch(function(error){
                // eslint-disable-next-line no-console
                console.log(error);
            });

            if(this.remainingClicks > 0){
                this.remainingClicks = this.remainingClicks - 1;
                if(this.remainingClicks === 0){
                    // implement alert dialog
                }
            }
        }
    },
    watch: {
        remainingClicks: function(clicks) {
            localStorage.remainingClicks = clicks;
            console.log("clicks: " + clicks);
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>