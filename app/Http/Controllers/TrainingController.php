<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Training;
use App\Models\TrainingPerson;
use App\Models\Company;

class TrainingController extends Controller
{
    public function search(Request $request)
    {
        $date = $request->get('date');

        $trainings = Training::with('division','persons')
                        // ->when(!empty($date), function($q) use ($date) {
                        //     $q->where('surver_date', $date);
                        // })
                        ->paginate(10);

        return response()->json($trainings);
    }

    public function getById($id)
    {
        $training = Training::with('division','persons')->find($id);

        return response()->json($training);
    }

    public function getInitialFormData()
    {
        $targets = [
            ['id' => 1, 'name' => 'พนักงาน'],
            ['id' => 2, 'name' => 'ประชาชนทั่วไป'],
            ['id' => 3, 'name' => 'เจ้าหน้าที่'],
            ['id' => 4, 'name' => 'นักเรียน/นักศึกษา'],
        ];

        return [
            'targets'   => $targets
        ];
    }

    public function store(Request $request) 
    {
        try {
            $training = new Training;
            $training->train_date       = $request['train_date'];
            $training->division_id      = $request['division_id'];
            $training->place            = $request['place'];
            $training->topic            = $request['topic'];
            $training->background       = $request['background'];
            $training->train_hour       = $request['train_hour'];
            $training->target_group_id  = $request['target_group_id'];
            $training->target_group_text = $request['target_group_text'];
            $training->num_of_participants = $request['num_of_participants'];
            $training->have_kpi         = $request['have_kpi'];
            $training->key_success      = $request['key_success'];
            $training->is_succeed       = $request['is_succeed'];
            $training->exhibition       = $request['exhibition'];
            $training->exhibition_name  = $request['exhibition_name'];
            $training->exhibition_num   = $request['exhibition_num'];
            $training->demonstration    = $request['demonstration'];
            $training->demonstration_name = $request['demonstration_name'];
            $training->demonstration_num = $request['demonstration_num'];
            $training->consultation     = $request['consultation'];
            $training->education        = $request['education'];
            $training->brochure         = $request['brochure'];
            $training->campaign         = $request['campaign'];
            $training->campaign_num     = $request['campaign_num'];
            $training->campaign_num     = $request['campaign_num'];
            // $training->remark           = $request['remark'];

            if ($request->file('training_pictures')) {
                $index = 0;
                $picNames = '';
                $destinationPath = 'uploads/training/pic/';

                foreach($request->file('training_pictures') as $file) {
                    $fileName = date('mdYHis') . uniqid(). '.' .$file->getClientOriginalExtension();

                    if ($file->move($destinationPath, $fileName)) {
                        if ($index < count($request->file('training_pictures')) - 1) {
                            $picNames .= $fileName.',';
                        } else {
                            $picNames .= $fileName;
                        }
                    }

                    $index++;
                }

                $training->training_pictures = $picNames;
            }

            if ($request->file('pr_pictures')) {
                $index = 0;
                $picNames = '';
                $destinationPath = 'uploads/training/pic/';

                foreach($request->file('pr_pictures') as $file) {
                    $fileName = date('mdYHis') . uniqid(). '.' .$file->getClientOriginalExtension();

                    if ($file->move($destinationPath, $fileName)) {
                        if ($index < count($request->file('pr_pictures')) - 1) {
                            $picNames .= $fileName.',';
                        } else {
                            $picNames .= $fileName;
                        }
                    }

                    $index++;
                }

                $plan->pr_pictures = $picNames;
            }

            if ($training->save()) {
                if (array_key_exists('persons', $request) && count($request['persons']) > 0) {
                    foreach($request['persons'] as $person) {
                        $newPerson = new TrainingPerson;
                        $newPerson->train_id    = $training->id;
                        $newPerson->name        = $person['name'];
                        $newPerson->position    = $person['position'];
                        $newPerson->company     = $person['company'];
                        $newPerson->save();
                    }
                }

                return [
                    'status'        => 1,
                    'message'       => 'Insertion successfully!!',
                    "training"      => $training
                ];
            } else {
                return [
                    'status'    => 0,
                    'message'   => 'Something went wrong!!'
                ];
            }
        } catch (\Exception $ex) {
            return [
                'status'    => 0,
                'message'   => $ex->getMessage()
            ];
        }
    }

    public function update(Request $request, $id) 
    {
        try {
            $training = Training::find($id);
            $training->train_date       = $request['train_date'];
            $training->division_id      = $request['division_id'];
            $training->place            = $request['place'];
            $training->topic            = $request['topic'];
            $training->background       = $request['background'];
            $training->train_hour       = $request['train_hour'];
            $training->target_group_id  = $request['target_group_id'];
            $training->target_group_text = $request['target_group_text'];
            $training->num_of_participants = $request['num_of_participants'];
            $training->have_kpi         = $request['have_kpi'];
            $training->key_success      = $request['key_success'];
            $training->is_succeed       = $request['is_succeed'];
            $training->exhibition       = $request['exhibition'];
            $training->exhibition_name  = $request['exhibition_name'];
            $training->exhibition_num   = $request['exhibition_num'];
            $training->demonstration    = $request['demonstration'];
            $training->demonstration_name = $request['demonstration_name'];
            $training->demonstration_num = $request['demonstration_num'];
            $training->consultation     = $request['consultation'];
            $training->education        = $request['education'];
            $training->brochure         = $request['brochure'];
            $training->campaign         = $request['campaign'];
            $training->campaign_num     = $request['campaign_num'];
            $training->campaign_num     = $request['campaign_num'];
            // $training->remark           = $request['remark'];

            // if ($request->file('training_pictures')) {
            //     $index = 0;
            //     $picNames = '';
            //     $destinationPath = 'uploads/training/pic/';

            //     foreach($request->file('training_pictures') as $file) {
            //         $fileName = date('mdYHis') . uniqid(). '.' .$file->getClientOriginalExtension();

            //         if ($file->move($destinationPath, $fileName)) {
            //             if ($index < count($request->file('training_pictures'))) {
            //                 $picNames .= $fileName.',';
            //             } else {
            //                 $picNames .= $fileName;
            //             }
            //         }

            //         $index++;
            //     }

            //     $training->training_pictures = $picNames;
            // }

            // if ($request->file('pr_pictures')) {
            //     $index = 0;
            //     $picNames = '';
            //     $destinationPath = 'uploads/training/pic/';

            //     foreach($request->file('pr_pictures') as $file) {
            //         $fileName = date('mdYHis') . uniqid(). '.' .$file->getClientOriginalExtension();

            //         if ($file->move($destinationPath, $fileName)) {
            //             if ($index < count($request->file('pr_pictures'))) {
            //                 $picNames .= $fileName.',';
            //             } else {
            //                 $picNames .= $fileName;
            //             }
            //         }

            //         $index++;
            //     }

            //     $plan->pr_pictures = $picNames;
            // }

            if ($training->save()) {
                if (count($request['persons']) > 0) {
                    foreach($request['persons'] as $person) {
                        if (array_key_exists('id', $person)) {
                            /** รายการเดิม */
                            // if (TrainingPerson::where('employee_id', $person['employee_id'])->count() == 0) {
                                $updatedPerson = TrainingPerson::find($person['id']);
                                // $updatedPerson->employee_id = $person['employee_id'];
                                $updatedPerson->name        = $person['name'];
                                $updatedPerson->position    = $person['position'];
                                $updatedPerson->company     = $person['company'];
                                $updatedPerson->save();
                            // }
                        } else {
                            /** รายการใหม่ */
                            $newPerson = new TrainingPerson;
                            $newPerson->train_id    = $training->id;
                            // $newPerson->employee_id = $person['employee_id'];
                            $newPerson->name        = $person['name'];
                            $newPerson->position    = $person['position'];
                            $newPerson->company     = $person['company'];
                            $newPerson->save();
                        }
                    }
                }

                return [
                    'status'        => 1,
                    'message'       => 'Updating successfully!!',
                    "training"      => $training
                ];
            } else {
                return [
                    'status'    => 0,
                    'message'   => 'Something went wrong!!'
                ];
            }
        } catch (\Exception $ex) {
            return [
                'status'    => 0,
                'message'   => $ex->getMessage()
            ];
        }
    }

    public function destroy($id) 
    {
        try {
            $training = Training::find($id);

            /** Remove uploaded file */
            $destinationPath = 'uploads/training/pic/';
            if ($training->training_pictures != '') {
                $pictures = explode(',', $training->training_pictures);

                foreach($pictures as $pic) {
                    $existed = $destinationPath . $pic;

                    if (\File::exists($existed)) {
                        \File::delete($existed);
                    }
                }
            }

            if ($training->pr_pictures != '') {
                $pictures = explode(',', $training->pr_pictures);

                foreach($pictures as $pic) {
                    $existed = $destinationPath . $pic;

                    if (\File::exists($existed)) {
                        \File::delete($existed);
                    }
                }
            }

            if ($training->delete()) {
                /** ลบผู้จัดกิจกรรมทั้งหมด */
                TrainingPerson::where('train_id', $id)->delete();

                return [
                    'status'        => 1,
                    'message'       => 'Deleting successfully!!',
                ];
            } else {
                return [
                    'status'    => 0,
                    'message'   => 'Something went wrong!!'
                ];
            }
        } catch (\Exception $ex) {
            return [
                'status'    => 0,
                'message'   => $ex->getMessage()
            ];
        }
    }
}
