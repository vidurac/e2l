@extends('layouts.master')

@section('content')

    <h1>Taskcategory <a href="{{ url('taskcategory/create') }}" class="btn btn-primary pull-right btn-sm">Add New Taskcategory</a></h1>
    <div class="table">
        <table class="table table-bordered table-striped table-hover">
            <thead>
                <tr>
                    <th>S.No</th><th>Category</th><th>User Id</th><th>Enable</th><th>Actions</th>
                </tr>
            </thead>
            <tbody>
            {{-- */$x=0;/* --}}
            @foreach($taskcategory as $item)
                {{-- */$x++;/* --}}
                <tr>
                    <td>{{ $x }}</td>
                    <td><a href="{{ url('taskcategory', $item->id) }}">{{ $item->category }}</a></td><td>{{ $item->user_id }}</td><td>{{ $item->enable }}</td>
                    <td>
                        <a href="{{ url('taskcategory/' . $item->id . '/edit') }}">
                            <button type="submit" class="btn btn-primary btn-xs">Update</button>
                        </a> /
                        {!! Form::open([
                            'method'=>'DELETE',
                            'url' => ['taskcategory', $item->id],
                            'style' => 'display:inline'
                        ]) !!}
                            {!! Form::submit('Delete', ['class' => 'btn btn-danger btn-xs']) !!}
                        {!! Form::close() !!}
                    </td>
                </tr>
            @endforeach
            </tbody>
        </table>
        <div class="pagination"> {!! $taskcategory->render() !!} </div>
    </div>

@endsection
