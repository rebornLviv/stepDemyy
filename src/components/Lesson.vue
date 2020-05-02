<template>
<div class="container-fluid">
    <div class="row">
        <v-col class="vd">
            <div class="videoCont">
                <div>
                    <video class="uroc" ref="source" @ended="setFlessons(currentLesson)" :src="this.$store.getters.getLessons[this.$store.getters.getCurrentLesson].videoUrl " type="video/mp4" controls>
                    </video>
                </div>
                <div class="title">
                    <p ref="titl">{{this.$store.getters.getLessons[this.$store.getters.getCurrentLesson].title}}</p>
                    <div class="author">
                        <p>{{author}}</p>
                        <v-icon size="35px">mdi-account</v-icon>
                    </div>
                </div>
               
                    <div class="rdiv" v-if="!rateIt" @mouseover="rateIt = !rateIt">
                    <star  :rating = rating  size="50px" />
                    </div>
                    <div  class="rdiv" v-if="rateIt"  @mouseout="rateIt = !rateIt">
                    <v-rating   class="rte" ref="stats"  v-model="rating" background-color="black" half-increments dark size="40px" ripple color="#4E5256" @input="rateStars($event)"></v-rating>
</div>
                
                <div class="description">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia odio deleniti quod voluptatibus quasi, iure accusamus corrupti blanditiis aliquid ratione, necessitatibus amet vel magnam unde numquam esse illo! Architecto nulla quibusdam ad officiis, illum vero, fugit iusto officia perspiciatis odio exercitationem impedit beatae explicabo minima deserunt vel. Voluptatibus, consequuntur fugit necessitatibus tempore fuga, eligendi voluptates ab nostrum delectus dolor ut rem? Perferendis hic iure deserunt debitis aspernatur et asperiores ipsam minima vero fuga praesentium voluptatibus, libero esse consequuntur sequi maxime eveniet quam expedita maiores. Id nobis vel maiores labore? Nesciunt repudiandae provident architecto ratione, dignissimos vel nobis voluptatem assumenda quam?

                </div>

            </div>
        </v-col>
        <v-col class="ls">
            <div class="videoList">
                <hooper :vertical="true" class="hoop" :itemsToShow="5" :trimWhiteSpace="true" :centerMode="true">
                    <slide class="lesson" v-for="(lesson,index) in lessons" :key="index">
                        <div class="prev" @click="changeVideo(lesson,index)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="61" height="45" viewBox="0 0 99 135">
                                <g id="Polygon_2" data-name="Polygon 2" transform="translate(99) rotate(90)" fill="#fff">
                                    <path d="M 106.617919921875 96.5 L 28.38208389282227 96.5 C 25.95551681518555 96.5 23.72024917602539 95.86758422851563 21.73836708068848 94.62030029296875 C 19.89376640319824 93.45940399169922 18.36956596374512 91.80667114257813 17.3305835723877 89.84075164794922 C 16.29159927368164 87.87483978271484 15.78468322753906 85.68447113037109 15.86464977264404 83.50642395019531 C 15.95058345794678 81.16630554199219 16.6872673034668 78.96320343017578 18.05423355102539 76.95829010009766 L 57.17214965820313 19.58535385131836 C 58.37675094604492 17.818603515625 59.93083190917969 16.44108772277832 61.79123306274414 15.49102020263672 C 63.53856658935547 14.59870338439941 65.51263427734375 14.12705421447754 67.5 14.12705421447754 C 69.48736572265625 14.12705421447754 71.46143341064453 14.59870338439941 73.20876312255859 15.49102020263672 C 75.06916809082031 16.44108772277832 76.62325286865234 17.818603515625 77.82785034179688 19.58535385131836 L 116.9457702636719 76.95830535888672 C 118.3127517700195 78.96320343017578 119.049430847168 81.16630554199219 119.1353530883789 83.50640106201172 C 119.2153167724609 85.68445587158203 118.7084197998047 87.87483978271484 117.66943359375 89.84073638916016 C 116.6304321289063 91.80665588378906 115.1062469482422 93.45940399169922 113.2616348266602 94.62030029296875 C 111.2797698974609 95.86758422851563 109.0445022583008 96.5 106.617919921875 96.5 Z" stroke="none" />
                                    <path d="M 67.5 16.62705230712891 C 64.14128112792969 16.62705230712891 61.12979888916016 18.2186279296875 59.23771667480469 20.99369049072266 L 20.11979675292969 78.36663055419922 C 19.02242279052734 79.97612762451172 18.43132019042969 81.73626708984375 18.36296081542969 83.59815216064453 C 18.29904174804688 85.3388671875 18.70635986328125 87.09358978271484 19.54087829589844 88.67259216308594 C 20.37538146972656 90.2515869140625 21.59571838378906 91.57662963867188 23.06996154785156 92.50443267822266 C 24.64679718017578 93.49681091308594 26.43405914306641 93.99999237060547 28.382080078125 93.99999237060547 L 106.617919921875 93.99999237060547 C 108.5659408569336 93.99999237060547 110.3531799316406 93.49681091308594 111.9300231933594 92.50443267822266 C 113.4042816162109 91.57662963867188 114.6246185302734 90.2515869140625 115.4591217041016 88.67259216308594 C 116.2936172485352 87.09356689453125 116.7009429931641 85.3388671875 116.6370239257813 83.59812927246094 C 116.5686645507813 81.73626708984375 115.9775772094727 79.97612762451172 114.8801803588867 78.36663055419922 L 75.76226043701172 20.99369049072266 C 73.87017822265625 18.2186279296875 70.85870361328125 16.62705230712891 67.5 16.62705230712891 M 67.5 11.62705230712891 C 72.20808410644531 11.62705230712891 76.91616058349609 13.81037139892578 79.89340209960938 18.17700958251953 L 119.0113220214844 75.54994964599609 C 125.8002777099609 85.50707244873047 118.6692199707031 98.99999237060547 106.617919921875 98.99999237060547 L 28.382080078125 98.99999237060547 C 16.33075714111328 98.99999237060547 9.199722290039063 85.50707244873047 15.98866271972656 75.54994964599609 L 55.10658264160156 18.17700958251953 C 58.08383178710938 13.81037139892578 62.79191589355469 11.62705230712891 67.5 11.62705230712891 Z" stroke="none" fill="#707070" />
                                </g>
                            </svg>
                        </div>
                        <div class="inform">
                            {{lesson.title}}
                        </div>
                        
                    </slide>
                    

                </hooper>

            </div>
        </v-col>
    </div>
</div>

</template>


<script>
import * as fb from 'firebase'
import star from './subComponents/Stars'
import {
    Hooper,
    Slide
} from 'hooper';
import 'hooper/dist/hooper.css';
export default {

    data() {
        return {
            clesson: null,
            flessons: [],
            rating: this.$store.getters.getLessons[this.$store.getters.getCurrentLesson].rating,
            src:'',
            title:'',
            description:'',
            rateIt:false,
            rateN:0
        }
    },
    components: {
        Hooper,
        Slide,
        star
    },

    methods: {
        changeVideo(lesson, index) {
            let crs = this.$route.path.split('/')[2]
            this.$store.dispatch('setCL',{course:crs,current:index})
            console.log(index)
            this.clesson = index
            this.$refs.source.src = lesson.videoUrl
            console.log("srrrc", this.$refs.source)
             this.rating = lesson.rating
            this.$refs.titl.textContent = lesson.title
        },
        getLesson(index) {
            this.clesson = index
        },
        setFlessons(currentLesson) {

            let crs = this.$route.path.split('/')[2]
            console.log("Crrrs", crs)
            let lessonToAdd = this.clesson || currentLesson;
            console.log('thisFlessons', this.flessons.includes(lessonToAdd))
            
            this.flessons.push(lessonToAdd)
            console.log(this.flessons)
            let res = this.flessons
            console.log('fired')
            this.$store.dispatch('finishedLessons', {
                flessons: res,
                course: crs
            }).
            then(
                () => {
                    this.$store.dispatch('setProgress', {
                        course: crs,
                        amount: this.lessons.length
                    })
                }
            )

        },
        async rateStars(event) {
            console.log("eveeent",event)
            console.log('stars', this.rating)
            console.log(this.rating)
            let rating = this.rating
            console.log('videoUrl', this.$refs.source.src)
            let videoUrl = this.$refs.source.src
            console.log('category', this.$route.path.split('/')[2])
            let category = this.$route.path.split('/')[2]
            await this.$store.dispatch('rateLesson', {
                rating,
                videoUrl,
                category
            })
            let course = this.$route.path.split('/')[2];
            console.log("Course Name", course)
            let lesson = this.$route.path.split('/')[3]
            await this.$store.dispatch('setLessons', {
                course,
                lesson
            })
            this.rating = this.$store.getters.getLessons[this.$store.getters.getCurrentLesson].rating;
        }

    },
    computed: {
        lessons() {
            //console.log('lessonsssss',this.$store.getters.getLessons)
            return this.$store.getters.getLessons
        },
        currentLesson() {
            return this.$store.getters.getCurrentLesson

        },
        author() {
            return this.$store.getters.getLessons[0].author

        },
        isLoading() {
            return this.$store.getters.loading;
        }

    },

    updated() {
        if (this.$refs.source && !this.rating) {
            this.$refs.source.currentTime = this.$store.getters.getCurrentTime;
        }

    },



    beforeRouteLeave(to, from, next) {
        //console.log("Current time",this.$refs.source.currentTime)
        let course = this.$route.path.split('/')[2];
        let finished = this.$refs.source.ended
        let currentTime = this.$refs.source.currentTime
        let currentLesson = this.clesson || this.currentLesson
        let amount = this.lessons.length
        let courseprogress = ((finished ? currentLesson + 1 : 0) * (100 / amount)) + '%'
        let flessons = []

        if (finished) {
            if (!flessons.includes(currentLesson)) {
                flessons.push(currentLesson)
            }

        }
        this.$store.dispatch("updateLesson", {
            currentTime,
            currentLesson,
            flessons,
            course,
            amount
        })

        console.log("currentTime", currentTime)
        console.log("currentLesson", currentLesson)
        console.log("Course progress", courseprogress)
        console.log("Ended", this.$refs.source.ended)
        let coursed = this.$route.path.split('/')[2];
        console.log("Course Name", coursed)
        let lesson = this.$route.path.split('/')[3]
        console.log('Lesson Name', lesson)

        this.$store.dispatch('setInitialState')
        next()
        // ...
    },
}
</script>

<style scoped>
.rdiv{
    width:260px;
    height: 55px;
    display: flex;
}
.row {
    justify-content: space-evenly !important;
}

.title {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;

}

.title>p {
    font-size: 35px;
    font-weight: lighter;

}

.authorD {
    height: 90px;
    display: flex;
    flex-direction: column;

}

.authorD>p {
    margin-bottom: 0px !important;
    text-align: right;
}

.rte>i {

    font-size: 35px;
}

.author {
    width: 200px;
    height: 70px;
    border: 1px solid #4E5256;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;

}

.author>p {
    margin-bottom: 0px !important;
    margin-right: 8px;
}

.author>i {
    width: 42px;
    height: 42px;
    border: 1px solid #4E5256;
    border-radius: 100%;
}

.row {
    display: flex;
    justify-content: space-between
}

.uroc {
    width: 854px;
    height: 480px;

}

.vd {
    max-width: 854px;
}

.videoCont {
    height: 854px;
    width: 854px;
}

.rr {
    display: flex;
    align-items: center;
    justify-content: center;
}

.playlist {
    border: 1px solid gray;
    height: 400px;
    margin-left: 170px;
}

.lesson {

    width: 384px;
    height: 114px !important;
    margin-bottom: 25px;
    display: flex;
}

.prev {
    width: 185px;
    height: 114px;
    border: 3px solid #4E5256;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-right: 5px;
}

.videoList {
    width: 384px;

}

.hoop {
    height: 700px;
}

.ls {
    max-width: 500px;
}

.inform {
    width: 245px;
}
</style>
