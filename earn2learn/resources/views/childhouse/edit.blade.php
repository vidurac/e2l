@extends('layouts.master')

@section('content')

    <h1>Edit Childhouse</h1>
    <hr/>

    {!! Form::model($childhouse, [
        'method' => 'PATCH',
        'route' => ['childhouse.update', $childhouse->id],
        'class' => 'form-horizontal'
    ]) !!}

                <div class="form-group {{ $errors->has('house_id') ? 'has-error' : ''}}">
                {!! Form::label('house_id', 'House Id: ', ['class' => 'col-sm-3 control-label']) !!}
                <div class="col-sm-6">
                    {!! Form::number('house_id', null, ['class' => 'form-control']) !!}
                    {!! $errors->first('house_id', '<p class="help-block">:message</p>') !!}
                </div>
            </div>
            <div class="form-group {{ $errors->has('child_id') ? 'has-error' : ''}}">
                {!! Form::label('child_id', 'Child Id: ', ['class' => 'col-sm-3 control-label']) !!}
                <div class="col-sm-6">
                    {!! Form::number('child_id', null, ['class' => 'form-control']) !!}
                    {!! $errors->first('child_id', '<p class="help-block">:message</p>') !!}
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