@extends('layouts.master')

@section('content')

    <h1>Create New Mailsubscription</h1>
    <hr/>

    {!! Form::open(['url' => 'mailsubscription', 'class' => 'form-horizontal']) !!}

                <div class="form-group {{ $errors->has('user_id') ? 'has-error' : ''}}">
                {!! Form::label('user_id', 'User Id: ', ['class' => 'col-sm-3 control-label']) !!}
                <div class="col-sm-6">
                    {!! Form::number('user_id', null, ['class' => 'form-control']) !!}
                    {!! $errors->first('user_id', '<p class="help-block">:message</p>') !!}
                </div>
            </div>
            <div class="form-group {{ $errors->has('payment') ? 'has-error' : ''}}">
                {!! Form::label('payment', 'Payment: ', ['class' => 'col-sm-3 control-label']) !!}
                <div class="col-sm-6">
                                <div class="checkbox">
                <label>{!! Form::radio('payment', '1') !!} Yes</label>
            </div>
            <div class="checkbox">
                <label>{!! Form::radio('payment', '0', true) !!} No</label>
            </div>
                    {!! $errors->first('payment', '<p class="help-block">:message</p>') !!}
                </div>
            </div>
            <div class="form-group {{ $errors->has('giftcatd') ? 'has-error' : ''}}">
                {!! Form::label('giftcatd', 'Giftcatd: ', ['class' => 'col-sm-3 control-label']) !!}
                <div class="col-sm-6">
                                <div class="checkbox">
                <label>{!! Form::radio('giftcatd', '1') !!} Yes</label>
            </div>
            <div class="checkbox">
                <label>{!! Form::radio('giftcatd', '0', true) !!} No</label>
            </div>
                    {!! $errors->first('giftcatd', '<p class="help-block">:message</p>') !!}
                </div>
            </div>
            <div class="form-group {{ $errors->has('lesson') ? 'has-error' : ''}}">
                {!! Form::label('lesson', 'Lesson: ', ['class' => 'col-sm-3 control-label']) !!}
                <div class="col-sm-6">
                                <div class="checkbox">
                <label>{!! Form::radio('lesson', '1') !!} Yes</label>
            </div>
            <div class="checkbox">
                <label>{!! Form::radio('lesson', '0', true) !!} No</label>
            </div>
                    {!! $errors->first('lesson', '<p class="help-block">:message</p>') !!}
                </div>
            </div>
            <div class="form-group {{ $errors->has('task') ? 'has-error' : ''}}">
                {!! Form::label('task', 'Task: ', ['class' => 'col-sm-3 control-label']) !!}
                <div class="col-sm-6">
                                <div class="checkbox">
                <label>{!! Form::radio('task', '1') !!} Yes</label>
            </div>
            <div class="checkbox">
                <label>{!! Form::radio('task', '0', true) !!} No</label>
            </div>
                    {!! $errors->first('task', '<p class="help-block">:message</p>') !!}
                </div>
            </div>
            <div class="form-group {{ $errors->has('newsletter') ? 'has-error' : ''}}">
                {!! Form::label('newsletter', 'Newsletter: ', ['class' => 'col-sm-3 control-label']) !!}
                <div class="col-sm-6">
                                <div class="checkbox">
                <label>{!! Form::radio('newsletter', '1') !!} Yes</label>
            </div>
            <div class="checkbox">
                <label>{!! Form::radio('newsletter', '0', true) !!} No</label>
            </div>
                    {!! $errors->first('newsletter', '<p class="help-block">:message</p>') !!}
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
            {!! Form::submit('Create', ['class' => 'btn btn-primary form-control']) !!}
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