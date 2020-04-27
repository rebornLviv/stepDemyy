
<template>
<v-container class="mb-12">
    <p v-if="isLoading">Loading......</p>
    <v-row class="courses " v-if="!isLoading" justify="center" align="center">
        <v-col cols="3" v-for="x in topLessons" :key="x.videoUrl" class="mb-7" align="center" justify="center">
            <div class="card">
                <v-icon class="iblc" size="140px">mdi-account</v-icon>
            </div>
            <div class="play-data" text-center align="center" justify="center">
                <p class="teacher">{{x.author}}</p>
                <div class="teacher">
                    <star :rating="x.rating"></star>
                </div>
            </div>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
import Star from './subComponents/Stars'
export default {
    data() {
        return {}
    },
    computed: {
        topLessons() {
            return this.$store.getters.getTopLessons
        },
        isLoading() {
            return this.$store.getters.loading
        }
    },
    async beforeCreate() {
        await this.$store.dispatch('getAllLessons')
    },
    components: {
        star: Star
    }
}
</script>

<style scoped>
.teacher {
    /* display: flex; */
    width: 275px;
    height: 30px;
    /* border: 1px solid black; */
    font-size: 22px;
}

.iblc {
    width: 162px;
    height: 162px;
    /* border: 1px solid black; */
    margin-top: 20px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.sbtext {
    margin-top: 40px;

}

.sctext {
    margin-top: 20px;
}

.sctext>p {
    font-size: 45px;
}

.sbtext>p:first-child {
    font-size: 45px;
}

.stext {
    font-size: 50px;
}

.txt {
    font-size: 50px;
}

.ib {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.c1 {
    height: 550px;
    width: 100%;

}

.ldate {

    text-align: left;
}

.itext {

    padding-top: 20px;
    font-size: 40px;
    font-weight: lighter;
}

.courses>div {
    display: flex;
    justify-content: center;
    align-items: center;

}

.iblc {
    width: 162px;
    height: 162px;
    border: 1px solid black;
    margin-top: 20px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.ibl {
    width: 262px;
    height: 162px;
    border: 1px solid black;
    margin-top: 20px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.mn {
    justify-content: center;
    display: flex;
}

.sm {
    border: 1px solid black;
    background: #4E5256
}

.smen {
    width: 300px;
    height: 300px;
    margin-top: 50px;
    border-radius: 10px;
    background: white;
    display: flex;
    justify-content: center;

}

.smenc {
    width: 300px;
    height: 300px;
    margin-top: 50px;
    border-radius: 10px;
    background: white;
    display: flex;
    flex-direction: column;
    align-items: center;

}

.smenb {

    background: white;
    width: 300px;
    height: 400px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.blackt {
    height: 130px;
    background: rgba(0, 0, 0, 0.75);
    background-size: 100%;
    width: 100%;
    margin-top: 60px;

    justify-content: center;
}

.courses {
    display: flex;
    justify-content: space-between;
}

.comp {
    width: 500px;
    height: 45px;
    background: rgba(128, 128, 128, 0.5);
    font-size: 20px;

}

.courses>div {
    flex-direction: column;

}

.courses>div>div {
    justify-content: center;

    align-items: center;
}

.courses>div>div:first-child {
    /* border: 1px solid black; */
    height: 175px;
    width: 275px;
    border-radius: 20px;

}

.ft {
    background: black;
}

.sbox {
    background: white;
    color: black;
    height: 50px;
    width: 500px;
    font-size: 25px;
    padding-left: 30px;
    /*border-radius: 20px;*/
    border: 1px solid black;
}

.sbtext>p,
.sctext>p {
    font-weight: lighter;
}

.card {
    display: flex;
    justify-content: center;
    align-items: center;
}

.play-data {
    margin: 0 auto;
    text-align:center;
}
</style>