@extends('layouts.master')

@section('content')

    <h1>Edit Taskallowcation</h1>
    <hr/>

    {!! Form::model($taskallowcation, [
        'method' => 'PATCH',
        'url' => ['taskallowcation', $taskallowcation->id],
        'class' => 'form-horizontal'
    ]) !!}

                <div class="form-group {{ $errors->has('child_id') ? 'has-error' : ''}}">
                {!! Form::label('child_id', 'Child Id: ', ['class' => 'col-sm-3 control-label']) !!}
                <div class="col-sm-6">
                    {!! Form::number('child_id', null, ['class' => 'form-control']) !!}
                    {!! $errors->first('child_id', '<p class="help-block">:message</p>') !!}
                </div>
            </div>
            <div class="form-group {{ $errors->has('task_id') ? 'has-error' : ''}}">
                {!! Form::label('task_id', 'Task Id: ', ['class' => 'col-sm-3 control-label']) !!}
                <div class="col-sm-6">
                    {!! Form::number('task_id', null, ['class' => 'form-control']) !!}
                    {!! $errors->first('task_id', '<p class="help-block">:message</p>') !!}
                </div>
            </div>
            <div class="form-group {{ $errors->has('house_id') ? 'has-error' : ''}}">
                {!! Form::label('house_id', 'House Id: ', ['class' => 'col-sm-3 control-label']) !!}
                <div class="col-sm-6">
                    {!! Form::number('house_id', null, ['class' => 'form-control']) !!}
                    {!! $errors->first('house_id', '<p class="help-block">:message</p>') !!}
                </div>
            </div>
            <div class="form-group {{ $errors->has('start_data') ? 'has-error' : ''}}">
                {!! Form::label('start_data', 'Start Data: ', ['class' => 'col-sm-3 control-label']) !!}
                <div class="col-sm-6">
                    {!! Form::input('datetime-local', 'start_data', null, ['class' => 'form-control']) !!}
                    {!! $errors->first('start_data', '<p class="help-block">:message</p>') !!}
                </div>
            </div>
            <div class="form-group {{ $errors->has('due_data') ? 'has-error' : ''}}">
                {!! Form::label('due_data', 'Due Data: ', ['class' => 'col-sm-3 control-label']) !!}
                <div class="col-sm-6">
                    {!! Form::input('datetime-local', 'due_data', null, ['class' => 'form-control']) !!}
                    {!! $errors->first('due_data', '<p class="help-block">:message</p>') !!}
                </div>
            </div>
            <div class="form-group {{ $errors->has('parent_accept') ? 'has-error' : ''}}">
                {!! Form::label('parent_accept', 'Parent Accept: ', ['class' => 'col-sm-3 control-label']) !!}
                <div class="col-sm-6">
                    {!! Form::number('parent_accept', null, ['class' => 'form-control']) !!}
                    {!! $errors->first('parent_accept', '<p class="help-block">:message</p>') !!}
                </div>
            </div>
            <div class="form-group {{ $errors->has('repeatable') ? 'has-error' : ''}}">
                {!! Form::label('repeatable', 'Repeatable: ', ['class' => 'col-sm-3 control-label']) !!}
                <div class="col-sm-6">
                    {!! Form::number('repeatable', null, ['class' => 'form-control']) !!}
                    {!! $errors->first('repeatable', '<p class="help-block">:message</p>') !!}
                </div>
            </div>
            <div class="form-group {{ $errors->has('duration') ? 'has-error' : ''}}">
                {!! Form::label('duration', 'Duration: ', ['class' => 'col-sm-3 control-label']) !!}
                <div class="col-sm-6">
                    {!! Form::number('duration', null, ['class' => 'form-control']) !!}
                    {!! $errors->first('duration', '<p class="help-block">:message</p>') !!}
                </div>
            </div>
            <div class="form-group {{ $errors->has('attempts') ? 'has-error' : ''}}">
                {!! Form::label('attempts', 'Attempts: ', ['class' => 'col-sm-3 control-label']) !!}
                <div class="col-sm-6">
                    {!! Form::number('attempts', null, ['class' => 'form-control']) !!}
                    {!! $errors->first('attempts', '<p class="help-block">:message</p>') !!}
                </div>
            </div>
            <div class="form-group {{ $errors->has('status') ? 'has-error' : ''}}">
                {!! Form::label('status', 'Status: ', ['class' => 'col-sm-3 control-label']) !!}
                <div class="col-sm-6">
                    {!! Form::number('status', null, ['class' => 'form-control']) !!}
                    {!! $errors->first('status', '<p class="help-block">:message</p>') !!}
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