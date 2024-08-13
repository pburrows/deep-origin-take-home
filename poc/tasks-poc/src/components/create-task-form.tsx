"use client"
import {FC, useRef} from "react";
import {Field, Form, Formik, FormikHelpers, FormikProps} from "formik";
import {Input} from "@headlessui/react";
import {Task} from "@/app/tasks/task-models";
import {createNewTask} from "@/app/tasks/task-helpers";
import {useRouter} from "next/navigation";

export interface Props {
}

interface FormValues {
    name: string;
    description: string;
    startDate: string;
    taskRepeats: boolean;
    repeatFrequency?: number;
    repeatPeriod?: 'day' | 'week' | 'month' | 'year';
    repeatOn?: string;
    rSun?: string;
    rMon?: string;
    rTue?: string;
    rWed?: string;
    rThu?: string;
    rFri?: string;
    rSat?: string;
    repeatEnds?: string;
    repeatEndOn?: string;
    repeatEndOccurrences?: number;
}

export const CreateTaskForm: FC<Props> = () => {
    const formikRef = useRef<FormikProps<FormValues>>(null)
    const router = useRouter()
    const defaultDate = new Date()
    defaultDate.setTime(defaultDate.getTime() + 1000 * 60);
    const initialValues: FormValues = {
        name: getRandomTitle(),
        description: getRandomDescription(),
        startDate: defaultDate.toISOString(),
        taskRepeats: false,
    }

    async function handleFormSubmit(values: FormValues, helpers: FormikHelpers<FormValues>) {
        console.log(values)
        // todo: validation

        const task: Task = {
            name: values.name,
            startDate: new Date(values.startDate),
            description: values.description,
            notify: {
                email: 'someone@someone.com'
            }
        }
        if(values.taskRepeats) {
            task.repeats = {
                frequency: values.repeatFrequency ?? 1,
                period: values.repeatPeriod ?? 'day',
                ends: 'never',
                on: ''
            }
            const repeatOnValues = []
            if(values.rSun) repeatOnValues.push('sunday')
            if(values.rMon) repeatOnValues.push('monday')
            if(values.rTue) repeatOnValues.push('tuesday')
            if(values.rWed) repeatOnValues.push('wednesday')
            if(values.rThu) repeatOnValues.push('thursday')
            if(values.rFri) repeatOnValues.push('friday')
            if(values.rSat) repeatOnValues.push('saturday')

            task.repeats.on = JSON.stringify(repeatOnValues)

            if(values.repeatEnds == 'on') {
                task.repeats.ends = 'on ' + values.repeatEndOn
            }
            if(values.repeatEnds == 'after') {
                task.repeats.ends = 'after ' + values.repeatEndOccurrences
            }

        }

        try {
            await createNewTask(task)
            router.push('/tasks/list')
        } catch (err: any) {
            console.error(err)
            // todo: handle server side errors
        }

    }

    return <div>
        <h1 className={'text-2xl'}>New Task</h1>
        <Formik initialValues={initialValues} onSubmit={handleFormSubmit} innerRef={formikRef}>
            {({errors, touched}) => (
                <Form>
                    <div>
                        <label>Title: </label>
                        <Field name={'name'} type={'text'} placeholder={'task title'}/>
                    </div>
                    <div className={'mt-4'}>
                        <label>Description: </label>
                        <Field name={'description'} type={'text'} placeholder={'task details'}/>
                    </div>
                    <div className={'mt-4'}>
                        <label>Start: </label>
                        <Field name={'startDate'} type={'datetime-local'}/>
                    </div>
                    <div className={'mt-4'}>
                        <label>
                            <Field name={'taskRepeats'} type={'checkbox'}/>
                            Task repeats</label>
                    </div>

                    {formikRef.current?.values.taskRepeats && <div className={'rounded p-4 border border-gray-700'}>
                        <div className={'mt-4'}>
                            <label>Every: </label>
                            <Field name={'repeatFrequency'} type={'number'}/>
                        </div>
                        <div>
                            <label>Period: </label>
                            <Field name={'repeatPeriod'} as={'select'}>
                                <option value={'day'}>Days</option>
                                <option value={'week'}>Weeks</option>
                                <option value={'month'}>Months</option>
                                <option value={'year'}>Years</option>
                            </Field>
                        </div>

                        {formikRef.current?.values.repeatPeriod === 'week' && <div>
                            <div className={'mt-4'}>
                                <label>Repeat On: </label>
                                <div>
                                    <label>
                                        <Field name={'rSun'} type={'checkbox'}/>
                                        Sunday
                                    </label>
                                    <label>
                                        <Field name={'rMon'} type={'checkbox'}/>
                                        Monday
                                    </label>
                                    <label>
                                        <Field name={'rTue'} type={'checkbox'}/>
                                        Tuesday
                                    </label>
                                    <label>
                                        <Field name={'rWed'} type={'checkbox'}/>
                                        Wednesday
                                    </label>
                                    <label>
                                        <Field name={'rThu'} type={'checkbox'}/>
                                        Thursday
                                    </label>
                                    <label>
                                        <Field name={'rFri'} type={'checkbox'}/>
                                        Friday
                                    </label>
                                    <label>
                                        <Field name={'rSat'} type={'checkbox'}/>
                                        Saturday
                                    </label>
                                </div>
                            </div>
                        </div>}

                        <div>
                            <label>Ends: </label>
                            <Field name={'repeatEnds'} as={'select'}>
                                <option value={'never'}>Never</option>
                                <option value={'on'}>On a specific date</option>
                                <option value={'after'}>after a number of occurrences</option>
                            </Field>
                        </div>


                        {formikRef.current?.values.repeatEnds === 'on' && <div>
                            <div className={'mt-4'}>
                                <label>End on Date: </label>
                                <Field name={'repeatEndOn'} type={'date'}/>
                            </div>
                        </div>}
                        {formikRef.current?.values.repeatEnds === 'after' && <div>
                            <div className={'mt-4'}>
                                <label>End after: </label>
                                <Field name={'repeatEndOccurrences'} type={'number'}/> occurrences
                            </div>
                        </div>}

                    </div>}

                    <div className={'mt-4'}>
                        <button type={'submit'}>Create Task</button>
                    </div>
                </Form>
            )}
        </Formik>
    </div>
}

function getRandomTitle() {
    const words = []
    words.push(weirdWords[randomInt(0, weirdWords.length - 1)])
    words.push(weirdWords[randomInt(0, weirdWords.length - 1)])
    words.push(weirdWords[randomInt(0, weirdWords.length - 1)])
    return words.join(' ')
}

function getRandomDescription() {
    const words = []
    const descLength = randomInt(10,20)
    for (let i = 0; i < descLength; i++) {
        words.push(weirdWords[randomInt(0, weirdWords.length - 1)].toLowerCase())
    }

    return words.join(' ')
}

export function randomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const weirdWords = [
    "Bumfuzzle",
    "Fartlek",
    "Everywhen",
    "Erf",
    "Hullaballoo",
    "Meldrop",
    "Obelus",
    "Sozzled",
    "Bumbershoot",
    "Titter",
    "Smicker",
    "Cleek",
    "Whippersnapper",
    "Salopettes",
    "Biblioklept",
    "Accubation",
    "Lollygag",
    "Abecedarian",
    "Bamboozled",
    "Cutesy-poo",
    "Flabbergast",
    "Foppish",
    "Cattywampus",
    "Noob",
    "Octothorpe",
    "Schmooze",
    "Finifugal",
    "Smaze",
    "Skirl",
    "Flibbertigibbet",
    "Hoecake",
    "Frippery",
    "Namby-pamby",
    "Gibbons",
    "Diphthong",
    "Wamble",
    "Geebung",
    "Jackanapes",
    "Teazel",
    "Kibitzer",
    "Phablet",
    "Mollycoddle",
    "Ragamuffin",
    "Snickersnee",
    "Piffle",
    "Puggle",
    "Rubaboo",
    "Scalawag",
    "Gibberish",
    "Teetotaler",
    "Skedaddle",
    "Wampum",
    "Spleenwort",
    "Hullabaloo",
    "Taradiddle",
    "Whirligig",
    "Yitten",
    "Ratoon",
    "Dingus",
    "Flibbertigibbet",
    "Pronk",
    "Hogwash",
    "Bupkis",
    "Fipple",
    "Aloof",
    "Williwaw",
    "Yooper",
    "Squeegee",
    "Doohickey",
    "Cabotage",
    "Deckled",
    "Frou-frou",
    "Ballyhoo",
    "Abear",
    "Whiffler",
    "Hoodwink",
    "Stumblebum",
    "Unperson",
    "Doozy",
]