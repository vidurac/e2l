@extends('layouts.master')

@section('content')

    <h1>Edit Result</h1>
    <hr/>

    {!! Form::model($result, [
        'method' => 'PATCH',
        'route' => ['result.update', $result->id],
        'class' => 'form-horizontal'
    ]) !!}

                <div class="form-group {{ $errors->has('attempt_id') ? 'has-error' : ''}}">
                {!! Form::label('attempt_id', 'Attempt Id: ', ['class' => 'col-sm-3 control-label']) !!}
                <div class="col-sm-6">
                    {!! Form::number('attempt_id', null, ['class' => 'form-control']) !!}
                    {!! $errors->first('attempt_id', '<p class="help-block">:message</p>') !!}
                </div>
            </div>
            <div class="form-group {{ $errors->has('question_id') ? 'has-error' : ''}}">
                {!! Form::label('question_id', 'Question Id: ', ['class' => 'col-sm-3 control-label']) !!}
                <div class="col-sm-6">
                    {!! Form::number('question_id', null, ['class' => 'form-control']) !!}
                    {!! $errors->first('question_id', '<p class="help-block">:message</p>') !!}
                </div>
            </div>
            <div class="form-group {{ $errors->has('answer_id') ? 'has-error' : ''}}">
                {!! Form::label('answer_id', 'Answer Id: ', ['class' => 'col-sm-3 control-label']) !!}
                <div class="col-sm-6">
                    {!! Form::number('answer_id', null, ['class' => 'form-control']) !!}
                    {!! $errors->first('answer_id', '<p class="help-block">:message</p>') !!}
                </div>
            </div>
            <div class="form-group {{ $errors->has('is_correct') ? 'has-error' : ''}}">
                {!! Form::label('is_correct', 'Is Correct: ', ['class' => 'col-sm-3 control-label']) !!}
                <div class="col-sm-6">
                                <div class="checkbox">
                <label>{!! Form::radio('is_correct', '1') !!} Yes</label>
            </div>
            <div class="checkbox">
                <label>{!! Form::radio('is_correct', '0', true) !!} No</label>
            </div>
                    {!! $errors->first('is_correct', '<p class="help-block">:message</p>') !!}
                </div>
            </div>
            <div class="form-group {{ $errors->has('enable') ? 'has-error' : ''}}">
                {!! Form::label('enable', 'Enable: ', ['class' => 'col-sm-3 control-label']) !!}
                <div class="col-sm-6">
                                <div class="checkbox">
                <label>{!! Form::radio('enable', '1') !!} Yes</label>
            </div>
            <div class="checkbox">
                <label>{!! Form::radio('enable', '0', true) !!} No</label>
            </div>
                    {!! $errors->first('enable', '<p class="help-block">:message</p>') !!}
                </div>
            </div>


    <div class="form-group">
        <div class="col-sm-offset-3 col-sm-3">
            {!! Form::submit('Update', ['class' => 'btn btn-primary form-control']) !!}
        </div>
    </div>
    {!! Form::close() !!}

    @if ($errors->any())
        <ul class="alert alert-danger">
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    @endif

@endsection