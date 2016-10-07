@extends('layouts.master')

@section('content')

    <h1>Taskallowcation <a href="{{ url('taskallowcation/create') }}" class="btn btn-primary pull-right btn-sm">Add New Taskallowcation</a></h1>
    <div class="table">
        <table class="table table-bordered table-striped table-hover">
            <thead>
                <tr>
                    <th>S.No</th><th>Child Id</th><th>Task Id</th><th>House Id</th><th>Actions</th>
                </tr>
            </thead>
            <tbody>
            {{-- */$x=0;/* --}}
            @foreach($taskallowcation as $item)
                {{-- */$x++;/* --}}
                <tr>
                    <td>{{ $x }}</td>
                    <td><a href="{{ url('taskallowcation', $item->id) }}">{{ $item->child_id }}</a></td><td>{{ $item->task_id }}</td><td>{{ $item->house_id }}</td>
                    <td>
                        <a href="{{ url('taskallowcation/' . $item->id . '/edit') }}">
                            <button type="submit" class="btn btn-primary btn-xs">Update</button>
                        </a> /
                        {!! Form::open([
                            'method'=>'DELETE',
                            'url' => ['taskallowcation', $item->id],
                            'style' => 'display:inline'
                        ]) !!}
                            {!! Form::submit('Delete', ['class' => 'btn btn-danger btn-xs']) !!}
                        {!! Form::close() !!}
                    </td>
                </tr>
            @endforeach
            </tbody>
        </table>
        <div class="pagination"> {!! $taskallowcation->render() !!} </div>
    </div>

@endsection
