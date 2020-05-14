<template>
<v-content>
    <v-form>
        <v-container>
            <v-row justify="center" align="center">
                <v-col cols="4">
                    <input style="display" v-model="query" class=" sbox" type="text" placeholder="Пошук..">
                </v-col>
            </v-row>
        </v-container>
        <hr>
    </v-form>
    <v-container class="mb-12">
        <v-row class="courses " v-if="!isLoading">
            <v-col cols="3" v-for="x in topLessons" :key="x.videoUrl" class="mb-7">
                <v-card 
                    class="card" 
                    :style="{backgroundImage: x.course === 'Typescript' ?`url(${typescript})` : `url(${angular})`}" @click="goToLesson(x)">
                </v-card>
                <div class="play-data" align="center">
                    <p class="urok">{{x.title}}</p>
                    <p>{{x.course}}</p>
                    <div class="teacher">
                        <p>{{x.author}}</p>
                        <v-spacer></v-spacer>
                        <v-icon>mdi-account</v-icon>
                    </div>
                    <div class="teacher">
                        <star :rating="x.rating"></star>
                    </div>
                </div>
            </v-col>
        </v-row>
    </v-container>
    <v-row justify="center" class="fixed">
        <v-btn fab color="" dark @click.stop="dialog = true">
            <v-icon large color="blue-white darken-2">mdi-call-split</v-icon>
        </v-btn>

        <v-dialog v-model="dialog" max-width="290">
            <v-card>
                <v-card-title class="headline">Filter</v-card-title>

                <v-card-text>
                    <v-row align="center" justify="center">
                        <v-col class="" align="center" justify="center" cols="12" sm="6">
                            <span class="max">Максимум</span>
                            <v-select :items="items" v-model="limit" label="Max" dense solo></v-select>

                            <p>По рейтингу</p>
                            <v-btn-toggle v-model="toggle_exclusive_rate">
                                <v-btn text @click="byRatingAsc">
                                    <v-icon>mdi-arrow-up-bold-circle-outline</v-icon>
                                </v-btn>
                                <v-btn text @click="byRatingDesc">
                                    <v-icon>mdi-arrow-down-bold-circle-outline</v-icon>
                                </v-btn>
                            </v-btn-toggle>

                            <p class="by-name">По імені</p>
                            <v-btn-toggle v-model="toggle_exclusive_name">
                                <v-btn text @click="byNameAsc">
                                    <v-icon>mdi-arrow-up-bold-circle-outline</v-icon>
                                </v-btn>
                                <v-btn text @click="byNameDesc">
                                    <v-icon>mdi-arrow-down-bold-circle-outline</v-icon>
                                </v-btn>
                            </v-btn-toggle>

                        </v-col>

                    </v-row>
                </v-card-text>

                <v-card-actions>
                    <v-btn color="green darken-1" text @click="applyFilters">
                        Підтвердити
                    </v-btn>
                    <v-spacer></v-spacer>

                    <v-btn color="green darken-1" text @click="dialog = false">
                        Вийти
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</v-content>
</template>

<script>
import Star from './subComponents/Stars'

export default {
    data() {
        return {
            query: '',
            limit: 12,
            byRating: null,
            optionRating: null,
            byName: null,
            optionName: null,
            dialog: false,
            items: [6, 12, 20],
            toggle_exclusive_name: undefined,
            toggle_exclusive_rate: undefined,
            prevlimit: 12,
            typescript: 'https://firebasestorage.googleapis.com/v0/b/stepdemy.appspot.com/o/coursePics%2FTupeScript.jpg?alt=media&token=74d72fb8-38b8-431c-81be-8ec5997e110a',
            angular: 'https://firebasestorage.googleapis.com/v0/b/stepdemy.appspot.com/o/coursePics%2FWeb%201920%20%E2%80%93%201.jpg?alt=media&token=556dd1d7-89bd-4f83-a775-005df8438403'
        }
    },
    methods: {
        applyFilters() {

            if (!this.byRating && !this.byName) {
                if (this.limit !== this.prevlimit) {
                    this.$store.dispatch('getTopLessons', {
                        limit: this.limit ? this.limit : 12
                    })
                    this.dialog = false;
                    this.prevlimit = this.limit
                    return;
                } else if (this.limit === this.prevlimit) {
                    this.dialog = false;
                    return;
                }

            }
            this.$store.dispatch('getTopLessons', {
                byRating: this.byRating,
                byName: this.byName,
                optionRating: this.optionRating,
                optionName: this.optionName,
                limit: this.limit ? this.limit : 12
            })
            this.toggle_exclusive_name = undefined;
            this.toggle_exclusive_rate = undefined;
            this.byRating = null;
            this.byName = null;
            this.optionRating = null;
            this.optionName = null;
            this.dialog = false

        },
        byRatingAsc() {
            // this.$store.dispatch('getTopLessons', {
            //     by: 'rating',
            //     option: 'asc',
            //     limit: this.limit
            // })
            this.byRating = 'rating'
            this.optionRating = 'asc'

        },
        byRatingDesc() {
            // this.$store.dispatch('getTopLessons', {
            //     by: 'rating',
            //     option: 'desc',
            //     limit: this.limit
            // })
            this.byRating = 'rating'
            this.optionRating = 'desc'
        },
        byNameAsc() {
            // this.$store.dispatch('getTopLessons', {
            //     by: 'title',
            //     option: 'asc'
            // })
            this.byName = 'title'
            this.optionName = 'asc'
        },
        byNameDesc() {

            // this.$store.dispatch('getTopLessons', {
            //     by: 'title',
            //     option: 'desc'
            // })
            this.byName = 'title'
            this.optionName = 'desc'
        },
        showMax(num) {
            this.limit = num;
            // this.$store.dispatch('getTopLessons', {
            //     by: this.by,
            //     option: this.option,
            //     limit: num
            // })

        },

        goToLesson(x) {
            console.log(x)
            this.$store.dispatch('addCourse', {
                    course: x.course,
                    title: x.cat
                })
                .then(
                    () => {
                        this.$store.dispatch('setClesson', {
                                course: x.course,
                                lesson: x.id
                            })
                            .then(
                                () => {
                                    this.$router.push({
                                        path: `/courses/${x.course}/${x.cat}`
                                    })
                                }
                            )

                    }
                )
        }

    },
    computed: {
        topLessons() {

            if (!this.query) return this.$store.getters.getTopLessons
            else return this.$store.getters.getTopLessons.filter(l => l.title.toLowerCase().includes(this.query.toLowerCase()) || l.course.toLowerCase().includes(this.query.toLowerCase()))
        },
        isLoading() {
            return this.$store.getters.loading
        }
    },
    components: {
        star: Star
    },
    mounted() {

        if (this.$route.query.filter) {
            this.query = this.$route.query.filter
        }
    }
}
</script>

<style scoped>
.v-content {
    padding-top: 0px !important;
}

.teacher {
    display: flex;
    width: 275px;
    height: 30px;
    /* border: 1px solid black; */
    border-radius: 5px;
    margin-top: 5px;
}

.urok {
    margin-bottom: 3px;
    margin-top: 14px;
    font-weight: bold;
    font-size: 22px;
    cursor: pointer;

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
    /* border: 1px solid black; */
    margin-top: 20px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.ibl {
    width: 262px;
    height: 162px;
    /* border: 1px solid black; */
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
    justify-content: start;
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
    border: 1px solid black;
    height: 175px;
    width: 275px;
    border-radius: 20px;
    box-shadow: 10px;
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
    background-position: center;
    background-size: cover;
}

.fixed {
    position: fixed;
    bottom: 10%;
    right: 5%;
    z-index: 99999;
}

.max {
    font-size: 20px;
    color: black;
}

p {
    color: black;
    font-size: 20px;
}

.by-name {
    margin-top: 15px;
}


</style>
