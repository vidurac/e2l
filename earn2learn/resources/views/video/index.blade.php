@extends('layouts.master')

@section('content')

    <h1>Videos <a href="{{ route('video.create') }}" class="btn btn-primary pull-right btn-sm">Add New Video</a></h1>
    <div class="table">
        <table class="table table-bordered table-striped table-hover">
            <thead>
                <tr>
                    <th>S.No</th><th>Name</th><th>Title</th><th>Description</th><th>Actions</th>
                </tr>
            </thead>
            <tbody>
            {{-- */$x=0;/* --}}
            @foreach($videos as $item)
                {{-- */$x++;/* --}}
                <tr>
                    <td>{{ $x }}</td>
                    <td><a href="{{ url('/video', $item->id) }}">{{ $item->name }}</a></td><td>{{ $item->title }}</td><td>{{ $item->description }}</td>
                    <td>
                        <a href="{{ route('video.edit', $item->id) }}">
                            <button type="submit" class="btn btn-primary btn-xs">Update</button>
                        </a> /
                        {!! Form::open([
                            'method'=>'DELETE',
                            'route' => ['video.destroy', $item->id],
                            'style' => 'display:inline'
                        ]) !!}
                            {!! Form::submit('Delete', ['class' => 'btn btn-danger btn-xs']) !!}
                        {!! Form::close() !!}
                    </td>
                </tr>
            @endforeach
            </tbody>
        </table>
        <div class="pagination"> {!! $videos->render() !!} </div>
    </div>

@endsection
