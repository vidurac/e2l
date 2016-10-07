@extends('layouts.master')

@section('content')

    <h1>Rewards <a href="{{ route('reward.create') }}" class="btn btn-primary pull-right btn-sm">Add New Reward</a></h1>
    <div class="table">
        <table class="table table-bordered table-striped table-hover">
            <thead>
                <tr>
                    <th>S.No</th><th>Attempt Id</th><th>Value</th><th>Enable</th><th>Actions</th>
                </tr>
            </thead>
            <tbody>
            {{-- */$x=0;/* --}}
            @foreach($rewards as $item)
                {{-- */$x++;/* --}}
                <tr>
                    <td>{{ $x }}</td>
                    <td><a href="{{ url('/reward', $item->id) }}">{{ $item->attempt_id }}</a></td><td>{{ $item->value }}</td><td>{{ $item->enable }}</td>
                    <td>
                        <a href="{{ route('reward.edit', $item->id) }}">
                            <button type="submit" class="btn btn-primary btn-xs">Update</button>
                        </a> /
                        {!! Form::open([
                            'method'=>'DELETE',
                            'route' => ['reward.destroy', $item->id],
                            'style' => 'display:inline'
                        ]) !!}
                            {!! Form::submit('Delete', ['class' => 'btn btn-danger btn-xs']) !!}
                        {!! Form::close() !!}
                    </td>
                </tr>
            @endforeach
            </tbody>
        </table>
        <div class="pagination"> {!! $rewards->render() !!} </div>
    </div>

@endsection
