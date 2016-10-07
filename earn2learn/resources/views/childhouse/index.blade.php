@extends('layouts.master')

@section('content')

    <h1>Childhouses <a href="{{ route('childhouse.create') }}" class="btn btn-primary pull-right btn-sm">Add New Childhouse</a></h1>
    <div class="table">
        <table class="table table-bordered table-striped table-hover">
            <thead>
                <tr>
                    <th>S.No</th><th>House Id</th><th>Child Id</th><th>Enable</th><th>Actions</th>
                </tr>
            </thead>
            <tbody>
            {{-- */$x=0;/* --}}
            @foreach($childhouses as $item)
                {{-- */$x++;/* --}}
                <tr>
                    <td>{{ $x }}</td>
                    <td><a href="{{ url('/childhouse', $item->id) }}">{{ $item->house_id }}</a></td><td>{{ $item->child_id }}</td><td>{{ $item->enable }}</td>
                    <td>
                        <a href="{{ route('childhouse.edit', $item->id) }}">
                            <button type="submit" class="btn btn-primary btn-xs">Update</button>
                        </a> /
                        {!! Form::open([
                            'method'=>'DELETE',
                            'route' => ['childhouse.destroy', $item->id],
                            'style' => 'display:inline'
                        ]) !!}
                            {!! Form::submit('Delete', ['class' => 'btn btn-danger btn-xs']) !!}
                        {!! Form::close() !!}
                    </td>
                </tr>
            @endforeach
            </tbody>
        </table>
        <div class="pagination"> {!! $childhouses->render() !!} </div>
    </div>

@endsection
