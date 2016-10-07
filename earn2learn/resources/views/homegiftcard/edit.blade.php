@extends('layouts.master')

@section('content')

    <h1>Edit Homegiftcard</h1>
    <hr/>

    {!! Form::model($homegiftcard, [
        'method' => 'PATCH',
        'url' => ['homegiftcard', $homegiftcard->id],
        'class' => 'form-horizontal'
    ]) !!}

                <div class="form-group {{ $errors->has('card_id') ? 'has-error' : ''}}">
                {!! Form::label('card_id', 'Card Id: ', ['class' => 'col-sm-3 control-label']) !!}
                <div class="col-sm-6">
                    {!! Form::text('card_id', null, ['class' => 'form-control']) !!}
                    {!! $errors->first('card_id', '<p class="help-block">:message</p>') !!}
                </div>
            </div>
            <div class="form-group {{ $errors->has('house_id') ? 'has-error' : ''}}">
                {!! Form::label('house_id', 'House Id: ', ['class' => 'col-sm-3 control-label']) !!}
                <div class="col-sm-6">
                    {!! Form::number('house_id', null, ['class' => 'form-control']) !!}
                    {!! $errors->first('house_id', '<p class="help-block">:message</p>') !!}
                </div>
            </div>
            <div class="form-group {{ $errors->has('points') ? 'has-error' : ''}}">
                {!! Form::label('points', 'Points: ', ['class' => 'col-sm-3 control-label']) !!}
                <div class="col-sm-6">
                    {!! Form::number('points', null, ['class' => 'form-control']) !!}
                    {!! $errors->first('points', '<p class="help-block">:message</p>') !!}
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