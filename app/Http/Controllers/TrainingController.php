<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Training;
use App\Models\TrainingPerson;
use App\Models\SurveyingSurveyor;
use App\Models\Company;
use App\Models\Gallery;
use App\Services\FileService;
use Ramsey\Uuid\Uuid;

class TrainingController extends Controller
{
    protected $fileService;

    protected $uploadDestPath = 'uploads/training/';

    public function __construct(FileService $fileService)
    {
        $this->fileService = $fileService;
    }

    public function search(Request $request)
    {
        $date = $request->get('date');

        $trainings = Training::with('division','persons','galleries')
                            ->with('persons.employee','persons.employee.position','persons.employee.level')
                            // ->when(!empty($date), function($q) use ($date) {
                            //     $q->where('surver_date', $date);
                            // })
                            ->orderBy('train_date', 'desc')
                            ->paginate(10);

        return response()->json($trainings);
    }

    public function getById($id)
    {
        $training = Training::with('division','persons','galleries')
                            ->with('persons.employee','persons.employee.position','persons.employee.level')
                            ->find($id);

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
            $training->train_date           = $request['train_date'];
            $training->division_id          = $request['division_id'];
            $training->place                = $request['place'];
            $training->topic                = $request['topic'];
            $training->background           = $request['background'];
            $training->train_hour           = $request['train_hour'];
            $training->target_group_id      = $request['target_group_id'];
            $training->target_group_text    = $request['target_group_text'];
            $training->num_of_participants  = $request['num_of_participants'];
            $training->have_kpi             = $request['have_kpi'];
            $training->key_success          = $request['key_success'];
            $training->is_succeed           = $request['is_succeed'];
            $training->exhibition           = $request['exhibition'];
            $training->exhibition_name      = $request['exhibition_name'];
            $training->exhibition_num       = $request['exhibition_num'];
            $training->demonstration        = $request['demonstration'];
            $training->demonstration_name   = $request['demonstration_name'];
            $training->demonstration_num    = $request['demonstration_num'];
            $training->consultation         = $request['consultation'];
            $training->education            = $request['education'];
            $training->brochure             = $request['brochure'];
            $training->campaign             = $request['campaign'];
            $training->campaign_num         = $request['campaign_num'];
            $training->campaign_num         = $request['campaign_num'];
            $training->guuid                = Uuid::uuid4();

            /** Upload pictures */
            $pictures = $this->fileService->uploadMultipleImages(
                $request->file('pictures'),
                $this->uploadDestPath . 'pic'
            );

            if ($training->save()) {
                if (array_key_exists('persons', $request) && count($request['persons']) > 0) {
                    foreach($request['persons'] as $person) {
                        $newPerson = new TrainingPerson;
                        $newPerson->train_id    = $training->id;
                        $newPerson->employee_id = $person['employee_id'];
                        // $newPerson->name        = $person['name'];
                        // $newPerson->position    = $person['position'];
                        // $newPerson->company     = $person['company'];
                        $newPerson->save();

                        $newSurveyor = new SurveyingSurveyor;
                        $newSurveyor->survey_type_id    = 6;
                        $newSurveyor->survey_id         = $training->id;
                        $newSurveyor->employee_id       = $person['employee_id'];
                        $newSurveyor->save();
                    }
                }

                /** Insert galleries */
                if (count($pictures) > 0) {
                    foreach($pictures as $key => $pic) {
                        $gallery = new Gallery;
                        $gallery->path  = $pic;
                        $gallery->guuid = $training->guuid;
                        $gallery->save();
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
            $training->train_date           = $request['train_date'];
            $training->division_id          = $request['division_id'];
            $training->place                = $request['place'];
            $training->topic                = $request['topic'];
            $training->background           = $request['background'];
            $training->train_hour           = $request['train_hour'];
            $training->target_group_id      = $request['target_group_id'];
            $training->target_group_text    = $request['target_group_text'];
            $training->num_of_participants  = $request['num_of_participants'];
            $training->have_kpi             = $request['have_kpi'];
            $training->key_success          = $request['key_success'];
            $training->is_succeed           = $request['is_succeed'];
            $training->exhibition           = $request['exhibition'];
            $training->exhibition_name      = $request['exhibition_name'];
            $training->exhibition_num       = $request['exhibition_num'];
            $training->demonstration        = $request['demonstration'];
            $training->demonstration_name   = $request['demonstration_name'];
            $training->demonstration_num    = $request['demonstration_num'];
            $training->consultation         = $request['consultation'];
            $training->education            = $request['education'];
            $training->brochure             = $request['brochure'];
            $training->campaign             = $request['campaign'];
            $training->campaign_num         = $request['campaign_num'];
            $training->campaign_num         = $request['campaign_num'];
            $training->guuid                = !empty($training->guuid) ? $training->guuid : Uuid::uuid4();

            /** Upload new pictures */
            $pictures = [];
            if ($request->file('pictures')) {
                $pictures = $this->fileService->uploadMultipleImages(
                    $request->file('pictures'),
                    $this->uploadDestPath . 'pic'
                );
            }

            if ($training->save()) {
                if (count($request['persons']) > 0) {
                    foreach($request['persons'] as $person) {
                        if (array_key_exists('survey_id', $person)) {
                            /** รายการเดิม ถ้าเป็นรายการเดิมให้ตรวจสอบว่ามี property flag removed หรือไม่ */
                            if (array_key_exists('removed', $person) && $person['removed']) {
                                SurveyingSurveyor::find($person['id'])->delete();
                            }
                        } else {
                            /** รายการใหม่ */
                            $newSurveyor = new SurveyingSurveyor;
                            $newSurveyor->survey_type_id    = 6;
                            $newSurveyor->survey_id         = $training->id;
                            $newSurveyor->employee_id       = $person['employee_id'];
                            $newSurveyor->save();
                        }
                    }
                }

                /** Insert new galleries */
                if (count($pictures) > 0) {
                    foreach($pictures as $key => $pic) {
                        $gallery = new Gallery;
                        $gallery->path  = $pic;
                        $gallery->guuid = $training->guuid;
                        $gallery->save();
                    }
                }

                /** ถ้าเป็นรายการเดิมให้ตรวจสอบว่ามี property flag removed หรือไม่ */
                if ($request['galleries'] && count($request['galleries']) > 0) {
                    foreach($request['galleries'] as $pic) {
                        if (array_key_exists('removed', $pic) && $pic['removed']) {
                            /** Remove physical file */
                            if (Storage::disk('public')->exists($pic['path'])) {
                                Storage::disk('public')->delete($pic['path']);
                            }

                            Gallery::find($pic['id'])->delete();
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
            $training = Training::with('galleries')->find($id);

            /** Remove uploaded pictures */
            if (count($training->galleries) > 0) {
                foreach($training->galleries as $pic) {
                    if (Storage::disk('public')->exists($pic->path)) {
                        Storage::disk('public')->delete($pic->path);

                        Gallery::find($pic->id)->delete();
                    }
                }
            }

            if ($training->delete()) {
                /** ลบผู้จัดกิจกรรมทั้งหมด */
                SurveyingSurveyor::where(['survey_id' => $id, 'survey_type_id' => 6])->delete();

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

    public function generateGuuid()
    {
        try {
            $trainings = Training::all();

            foreach($trainings as $train) {
                if ($train->training_pictures) {
                    $pictures = explode(',', $train->training_pictures);

                    /** update trainings data */
                    $updating = Training::find($train->id);
                    $updating->guuid = Uuid::uuid4();
                    $updating->save();
                    
                    /** insert new galleries data */
                    foreach($pictures as $key => $pic) {
                        $gallery = new Gallery;
                        $gallery->path  = $this->uploadDestPath . 'pic/' . $pic;
                        $gallery->guuid = $updating->guuid;
                        $gallery->save();
                    }
                }
            }

            return [
                'status'    => 'ok',
                'message'   => 'Processing successfully!!',
            ];
        } catch (\Exception $ex) {
            return [
                'status'    => 0,
                'message'   => $ex->getMessage()
            ];
        }
    }

    public function generateSurveyors()
    {
        try {
            $trainings = Training::with('persons')->get();

            foreach($trainings as $train) {
                if(count($train->persons) > 0) {
                    /** Create new SurveyingSurveyor from training's persons data */
                    foreach($train->persons as $person) {
                        $newSurveyor = new SurveyingSurveyor;
                        $newSurveyor->survey_type_id    = 6;
                        $newSurveyor->survey_id         = $train->id;
                        $newSurveyor->employee_id       = $person->employee_id;
                        $newSurveyor->save();
                    }
                }
            }

            return [
                'status'    => 'ok',
                'message'   => 'Processing successfully!!',
            ];
        } catch (\Exception $ex) {
            return [
                'status'    => 0,
                'message'   => $ex->getMessage()
            ];
        }
    }
}
