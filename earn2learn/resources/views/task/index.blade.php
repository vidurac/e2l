@extends('layouts.master')

@section('content')

    <h1>Task <a href="{{ url('task/create') }}" class="btn btn-primary pull-right btn-sm">Add New Task</a></h1>
    <div class="table">
        <table class="table table-bordered table-striped table-hover">
            <thead>
                <tr>
                    <th>S.No</th><th>Task</th><th>Description</th><th>Category</th><th>Actions</th>
                </tr>
            </thead>
            <tbody>
            {{-- */$x=0;/* --}}
            @foreach($task as $item)
                {{-- */$x++;/* --}}
                <tr>
                    <td>{{ $x }}</td>
                    <td><a href="{{ url('task', $item->id) }}">{{ $item->task }}</a></td><td>{{ $item->description }}</td><td>{{ $item->category }}</td>
                    <td>
                        <a href="{{ url('task/' . $item->id . '/edit') }}">
                            <button type="submit" class="btn btn-primary btn-xs">Update</button>
                        </a> /
                        {!! Form::open([
                            'method'=>'DELETE',
                            'url' => ['task', $item->id],
                            'style' => 'display:inline'
                        ]) !!}
                            {!! Form::submit('Delete', ['class' => 'btn btn-danger btn-xs']) !!}
                        {!! Form::close() !!}
                    </td>
                </tr>
            @endforeach
            </tbody>
        </table>
        <div class="pagination"> {!! $task->render() !!} </div>
    </div>

@endsection
